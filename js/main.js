var todoInputType = document.getElementById("todo-input-type");
var todoInputDo = document.getElementById("todo-input-do");
var todoContainer = document.getElementById("todo-container");
var submitBtn = document.getElementById("submit-button");
var updateBtn = document.getElementById("update-button"); 
var allTodos =[]

if(localStorage.getItem("todos") != null ){
    allTodos = JSON.parse(localStorage.getItem("todos"))
    displayData();
}

function addTodo(){
    if(todoInputType.value == "" || todoInputDo.value == "")
    {
        Swal.fire("can't add a validate data!");
    } else{
        var todo= {
            type: todoInputType.value,
            whatDo: todoInputDo.value,
        }
        allTodos.push(todo);
        console.log(allTodos);
        displayData();
        clearForm();
        localStorage.setItem("todos", JSON.stringify(allTodos))
    }}

function displayData(){
    var cartona = ""
    for (var i=0 ; i<allTodos.length ; i++){
        cartona+= `
        <div class="bg-white p-3 nb-1 border border-1 d-flex justify-content-between align-items-center shadow-sm">
        <div class="text">
            <span class="fs-5 text-danger d-block">${allTodos[i].type}</span>
            <span class="fs-5">${allTodos[i].whatDo}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash-can px-2 text-danger fs-5" onclick="deleteTodo(${i})"></i>
            <i class="fa-solid fa-pen-to-square px-2 text-success fs-5" onclick="preUpdate(${i})"></i>
        </div>
    </div>`
    }
    todoContainer.innerHTML=cartona;
}

function clearForm(){
    todoInputType.value = ""
    todoInputDo.value = ""
}

function deleteTodo(index){
    allTodos.splice(index, 1);
    displayData();
    localStorage.setItem("todos", JSON.stringify(allTodos))
}

var updateIndex;
function preUpdate(index){
    updateIndex = index;
    todoInputType.value = allTodos[index].type
    todoInputDo.value = allTodos[index].whatDo
    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none")
}

function updateTodo(){
    var updateTodo= {
        type: todoInputType.value,
        whatDo: todoInputDo.value,
    }
    allTodos.splice(updateIndex,1,updateTodo);
    displayData();
    clearForm();
    submitBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    localStorage.setItem("todos", JSON.stringify(allTodos))
}

function searchByContent(term){
    var cartona = ""
    for(var i = 0; i<allTodos.length; i++){
        if(allTodos[i].whatDo.toLowerCase().includes(term.toLowerCase())){
            cartona+= `
            <div class="bg-white p-3 nb-1 border border-1 d-flex justify-content-between align-items-center shadow-sm">
            <div class="text">
                <span class="fs-5 text-danger d-block">${allTodos[i].type}</span>
                <span class="fs-5">${allTodos[i].whatDo}</span>
            </div>
            <div>
                <i class="fa-solid fa-trash-can px-2 text-danger fs-5" onclick="deleteTodo(${i})"></i>
                <i class="fa-solid fa-pen-to-square px-2 text-success fs-5" onclick="preUpdate(${i})"></i>
            </div>
        </div>`
        }
    }
    todoContainer.innerHTML = cartona;
}
