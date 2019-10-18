import React from "react";
import { Link } from "react-router-dom";

function search(cnx: any, text: string, state) {
  self.trigger = "click";
  if (text.length > 2) {

    if (window.location.pathname == "/search") {
      if (sessionStorage.getItem("search")) {
        text = sessionStorage.getItem("search");
        sessionStorage.removeItem("search");
      } else {
        text = text.charAt(0).toUpperCase() + text.slice(1);
      }
      state({ searchTape: true });

      cnx
        .collection("items")
        .orderBy("title")
        .limit(16)
        .startAt(text)
        .endAt(text + "\uf8ff")
        .get()
        .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
          if (!querySnapshot.empty) {
            let newArr: any[] = [];
            querySnapshot.docs.forEach((v: firebase.firestore.QueryDocumentSnapshot, k: number) => {
              newArr.push(querySnapshot.docs[k].data());
            });
            newArr = chunk(newArr, 4);
            state({ search: newArr });
            sessionStorage.setItem("search", JSON.stringify(newArr));
            state({ searchTape: false });
          } else {
            state({ searchTape: false });
          }
        });
    }
    else {
      text = text.charAt(0).toUpperCase() + text.slice(1);

      cnx
        .collection("items")
        .orderBy("title")
        .limit(16)
        .startAt(text)
        .endAt(text + "\uf8ff")
        .get()
        .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
          if (!querySnapshot.empty) {
            let newArr: any[] = [];
            querySnapshot.docs.forEach((v: firebase.firestore.QueryDocumentSnapshot, k: number) => {
              newArr.push(querySnapshot.docs[k].data());
            });
            newArr = chunk(newArr, 4);
            sessionStorage.setItem("search", JSON.stringify(newArr));
            //state({ searchTape: false });
          } else {
            //state({ searchTape: false });
          }
        });
    }
  } else {
    //state({ search: false });
  }
}

function chunk(arr: any[], size: number) {
  return arr.reduce(
    (chunks, el, i) =>
      (i % size ? chunks[chunks.length - 1].push(el) : chunks.push([el])) &&
      chunks,
    []
  );
}

export default React.memo((props: any) => {
  return (
    <section className="header__search">
      <form onSubmit={e => e.preventDefault()} method="POST" action="search">
        <input
          onChange={e => search(props.cnx, e.target.value, props.parentState)}
          type="search"
          id="search"
          placeholder="ex:sony"
        />
        <Link to="/search">
          <label />
        </Link>
      </form>
    </section>
  );
});
