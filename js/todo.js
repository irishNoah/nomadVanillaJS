const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

// 새로고침 시 로컬 스토리지 값 Binding 위해 const가 아닌 let 활용
let toDos = [];

function saveToDos(){ // toDo 리스트들을 로컬 스토리지에 배열 형식으로 저장
    // (STRINGIFY = 변수 등을 문자열로 바꿈, PARSE = 문자열을 JSON으로 바꿈)
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event){ // 특정 toDo를 삭제하는 함수
    const li = event.target.parentElement;
    li.remove();
    /*
    - toDo는 toDos DB에 있는 요소 중 하나!!!
    - li.id 는 삭제한 버튼 => 즉, 아래 filter() 역할 : 삭제한 id 외의 값들은 남긴다!
    - li.id는 문자열 / toDo.id는 정수 => 따라서, li.id를 parseInt()를 해준다! */
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id)); 
    saveToDos(); // 한 번 더 저장!
}

function paintToDo(newTodo){ // toDo를 그리는 함수
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    // 파라미터인 newTodo가 객체이므로 글자를 보고 싶으면 text 메서드 사용
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "X";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span); // HTML의 li 태그에 span 태그를 자식으로 넣기
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault(); // 새로 고침 방지
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = { // 객체 느낌으로 로컬 스토리지에 값 넣기
        text: newTodo,
        id : Date.now(),
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  // 새로고침시 배열 toDos에 기존 로컬 스토리지 값 넣어주기
  toDos = parsedToDos; 
  parsedToDos.forEach(paintToDo);
}