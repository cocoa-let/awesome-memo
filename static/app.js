async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT", //어떠한 값을 수정할 때 쓰는 메소드
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo_ul");

  const li = document.createElement("li");
  li.innerText = `${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;
  ㅎ;

  const delbtn = document.createElement("button");
  delbtn.innerText = "삭제";
  delbtn.addEventListener("click", deleteMemo);
  delbtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(delbtn);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo_ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo);
}

readMemo();

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  const jsonRes = await res.json();
  readMemo();
}
//await을 쓸 때는 function 앞에 async 붙여주기

async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE", //어떠한 값을 수정할 때 쓰는 메소드
  });
  readMemo();
}

function handleSubmit(event) {
  event.preventDefault(); //동작하는 event 막기
  const input = document.querySelector("#memo_input"); //input에 입력된 값 가져오기
  createMemo(input.value);
  input.value = ""; //쓴 값 삭제
}

const form = document.querySelector("#memo_form");
form.addEventListener("submit", handleSubmit);

readMemo();
