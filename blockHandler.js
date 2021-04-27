document.addEventListener("DOMContentLoaded", () => {

    const CARD_ADD = document.getElementById("cardAdd");
    const CARD_FORM = document.getElementById("cardForm");

    const SUBMIT_CARD = document.getElementById("submitTask");
    const CARD_TITLE = document.getElementById("newTitle");
    const CARD_DESCRIPTION = document.getElementById("newDesc");

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = dd + '.' + mm + '.' + yyyy;

    let deleteCard = document.getElementsByClassName("delete");

    let todoTaskCollection = [];
    let pendingTaskCollection = [];
    let completedTaskCollection = [];

    todoTaskCollection = JSON.parse(localStorage.getItem("todoTaskCollection") || "[]");
    console.log(todoTaskCollection);
    render();

    document.addEventListener("load", () => {
        todoTaskCollection = JSON.parse(localStorage.getItem("todoTaskCollection") || "[]");
        pendingTaskCollection = JSON.parse(localStorage.getItem("pendingTaskCollection") || "[]");
        completedTaskCollection = JSON.parse(localStorage.getItem("completedTaskCollection") || "[]");
        render();
        reload();
    });

    reload(); // Delete buttons loaded  

    CARD_ADD.addEventListener("click", () => {
        if(CARD_FORM.style.display === "none"){
            CARD_ADD.textContent = CARD_ADD.textContent.slice(0, -1) + "▲";
            CARD_FORM.style.display = "inline";
        }
        else {
            CARD_ADD.textContent = CARD_ADD.textContent.slice(0, -1) + "▼";
            CARD_FORM.style.display = "none";
        }
    });

    SUBMIT_CARD.addEventListener("click", () => {
        let taskJSON = {title: CARD_TITLE.value, description: CARD_DESCRIPTION.value, duedate: today};
        todoTaskCollection.push(taskJSON);
        render();
        reload();
    });

    
    function render(){

        let 
            uncompletedTasks = document.getElementById('uncompletedTasks'),
            pendingTasks = document.getElementById('pendingTasks'),
            completedTasks = document.getElementById('completedTasks');

        uncompletedTasks.innerHTML = "";
        pendingTasks.innerHTML = "";
        completedTasks.innerHTML = "";
        
        todoTaskCollection.forEach((todoTask, index) => {
            let task = `
                <td class="taskCard">
                    <p class="identificator" style="display:none;">${index}</p>
                    <h2 class="cardTitle">>> ${todoTask.title}</h2>
                    <p>${todoTask.description}</p>
                    <p>${todoTask.duedate}</p>
                    <div align="center">
                        <span class="delete" style="color: red;">X</span><span class="moveLeft"><</span><span class="moveRight">></span>
                    </div>
                </td>`

            uncompletedTasks.innerHTML += task;
            localStorage.setItem("todoTaskCollection", JSON.stringify(todoTaskCollection));
        });
        pendingTaskCollection.forEach((todoTask) => {
            let task = `
                <td class="taskCard">
                    <p class="identificator" style="display:none;">${index}</p>
                    <h2 class="cardTitle">>> ${todoTask.title}</h2>
                    <p>${todoTask.description}</p>
                    <p>${todoTask.duedate}</p>
                    <div align="center">
                        <span class="delete" style="color: red;">X</span><span class="moveLeft"><</span><span class="moveRight">></span>
                    </div>
                </td>`

            pendingTasks.innerHTML += task;
            localStorage.setItem("pendingTaskCollection", JSON.stringify(pendingTaskCollection));
        });
        completedTaskCollection.forEach((todoTask) => {
            let task = `
                <td class="taskCard">
                    <p class="identificator" style="display:none;">${index}</p>
                    <h2 class="cardTitle">>> ${todoTask.title}</h2>
                    <p>${todoTask.description}</p>
                    <p>${todoTask.duedate}</p>
                    <div align="center">
                        <span class="delete" style="color: red;">X</span><span class="moveLeft"><</span><span class="moveRight">></span>
                    </div>
                </td>`

            completedTasks.innerHTML += task;
            localStorage.setItem("completedTaskCollection", JSON.stringify(completedTaskCollection));
        });
    }

    function reload(){
        Array.from(deleteCard).forEach((card) => {
            card.addEventListener('click', () => {
                if(confirm("Are you sure you want to delete this task?")){
                    let index = card.parentNode.parentNode.getElementsByClassName("identificator")[0].textContent;

                    switch(card.parentElement.parentElement.parentElement.parentElement.parentElement.id) {
                        case "uncompletedTasks":
                            todoTaskCollection.splice(index, 1);
                            localStorage.setItem("todoTaskCollection", JSON.stringify(todoTaskCollection));
                            break;
                        case "pendingTasks":
                            pendingTaskCollection.splice(index, 1);
                            localStorage.setItem("pendingTaskCollection", JSON.stringify(pendingTaskCollection));
                            break;
                        case "completedTasks":
                            uncompletedTaskCollection.splice(index, 1);
                            localStorage.setItem("completedTaskCollection", JSON.stringify(completedTaskCollection));
                            break;
                    }

                    card.parentNode.parentNode.parentNode.removeChild(card.parentNode.parentNode);
                    location.reload();
                }
            });
        });
    }
});