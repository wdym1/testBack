async function postData() {
  ar = [3000, 10, 20, 1234, 40, 50];
  ar.splice(4, 2, 1234, 2345);
  console.log(ar);
  let data = {
    name: "John",
    age: 18,
    email: "john@gmail.com",
    password: "john",
    employees: [
      {
        name: "Peter",
        age: 20,
        salary: 10000,
      },
      {
        name: "Peter",
        age: 20,
        salary: 10000,
      },
      {
        name: "Smith",
        age: 25,
        salary: 20000,
      },
      {
        name: "Maxwell",
        age: 30,
        salary: 25000,
      },
      {
        name: "David",
        age: 27,
        salary: 19000,
      },
    ],
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  console.log("Hello");
  const res = await fetch("/user/createuser", options);
  const data1 = await res.json();
  console.log(data1);
}

let formElem = document.querySelector("#formElem");

formElem.onsubmit = async (e) => {
  e.preventDefault();
  formEle = e.target;
  let data = new FormData();
  let myfile = document.getElementById("img").files[0];
  data.append("photo", myfile, "profilephoto.png");
  console.log(Array.from(data));
  console.log(data);
  let response = await fetch("/user/postdata", {
    method: "POST",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    body: data,
  });

  let result = await response.json();

  alert(result.error);
};
// "Content-Type": "multipart/form-data"
