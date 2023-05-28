function saveLocal(obj) {
  let objects;
  if (localStorage.getItem(`objectsArr`) === null) {
    objects = [];
  } else {
    objects = JSON.parse(localStorage.getItem("objectsArr"));
  }
  objects.push(obj);
  localStorage.setItem("objectsArr", JSON.stringify(objects));
}

function getFromLocal() {
  let objects;
  if (localStorage.getItem("objectsArr") === null) {
    objects = [];
  } else {
    objects = JSON.parse(localStorage.getItem("objectsArr"));
  }
  return objects;
}

function deleteInLocal(object) {
  let objects;
  if (localStorage.getItem("objectsArr") === null) {
    objects = [];
  } else {
    objects = JSON.parse(localStorage.getItem("objectsArr"));
  }
  objects.forEach((loopObject) => {
    if (
      loopObject.input === object.input ||
      loopObject.output === object.output
    ) {
      objects.splice(objects.indexOf(loopObject), 1);
      localStorage.setItem("objectsArr",JSON.stringify(objects));
    }
  });
}

export { saveLocal, getFromLocal, deleteInLocal };
