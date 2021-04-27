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
    let moveCardLeft = document.getElementsByClassName("moveLeft");
    let moveCardRight = document.getElementsByClassName("moveRight");

    let todoTaskCollection = [];
    let pendingTaskCollection = [];
    let completedTaskCollection = [];

    todoTaskCollection = JSON.parse(localStorage.getItem("todoTaskCollection") || "[]");
    pendingTaskCollection = JSON.parse(localStorage.getItem("pendingTaskCollection") || "[]");
    completedTaskCollection = JSON.parse(localStorage.getItem("completedTaskCollection") || "[]");
    render();
    reload();  

    CARD_ADD.addEventListener("click", () => {
        if(CARD_FORM.style.display === "none"){
            CARD_ADD.textContent = CARD_ADD.textContent.slice(0, -1) + "▲";
            CARD_FORM.style.display = "inline";
        }
        else HideCard();
    });

    SUBMIT_CARD.addEventListener("click", () => {
        let taskJSON = {title: CARD_TITLE.value, description: CARD_DESCRIPTION.value, duedate: today};
        todoTaskCollection.push(taskJSON);
        HideCard();
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
        pendingTaskCollection.forEach((todoTask, index) => {
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
        completedTaskCollection.forEach((todoTask, index) => {
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
        // Deleting cards
        Array.from(deleteCard).forEach((card) => {
            card.addEventListener('click', () => {
                console.log(card.parentNode.parentNode.getElementsByClassName("identificator")[0].textContent);
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
                            completedTaskCollection.splice(index, 1);
                            localStorage.setItem("completedTaskCollection", JSON.stringify(completedTaskCollection));
                            break;
                    }

                    card.parentNode.parentNode.parentNode.removeChild(card.parentNode.parentNode);
                    location.reload();
                }
            });
        });

        // Moving cards to left
        Array.from(moveCardLeft).forEach((arrowLeft) => {
            arrowLeft.addEventListener("click", () => {
                let index = arrowLeft.parentNode.parentNode.getElementsByClassName("identificator")[0].textContent;

                switch(arrowLeft.parentElement.parentElement.parentElement.parentElement.parentElement.id) {
                    case "uncompletedTasks":
                        break;
                    case "pendingTasks":
                        todoTaskCollection.push(pendingTaskCollection[index]);
                        pendingTaskCollection.splice(index, 1);
                        localStorage.setItem("todoTaskCollection", JSON.stringify(todoTaskCollection));
                        localStorage.setItem("pendingTaskCollection", JSON.stringify(pendingTaskCollection));
                        break;
                    case "completedTasks":
                        pendingTaskCollection.push(completedTaskCollection[index]);
                        completedTaskCollection.splice(index, 1);
                        localStorage.setItem("pendingTaskCollection", JSON.stringify(pendingTaskCollection));
                        localStorage.setItem("completedTaskCollection", JSON.stringify(completedTaskCollection));
                        break;
                }
                location.reload();
            });
        });

        // Moving cards to right
        Array.from(moveCardRight).forEach((arrowRight) => {
            arrowRight.addEventListener("click", () => {
                let index = arrowRight.parentNode.parentNode.getElementsByClassName("identificator")[0].textContent;

                switch(arrowRight.parentElement.parentElement.parentElement.parentElement.parentElement.id) {
                    case "uncompletedTasks":
                        pendingTaskCollection.push(todoTaskCollection[index]);
                        todoTaskCollection.splice(index, 1);
                        localStorage.setItem("todoTaskCollection", JSON.stringify(todoTaskCollection));
                        localStorage.setItem("pendingTaskCollection", JSON.stringify(pendingTaskCollection));
                        break;
                    case "pendingTasks":
                        completedTaskCollection.push(pendingTaskCollection[index]);
                        pendingTaskCollection.splice(index, 1);
                        localStorage.setItem("completedTaskCollection", JSON.stringify(completedTaskCollection));
                        localStorage.setItem("pendingTaskCollection", JSON.stringify(pendingTaskCollection));
                        break;
                    case "completedTasks":
                        break;
                }
                location.reload();
            });
        });
    }

    function HideCard(){
        CARD_ADD.textContent = CARD_ADD.textContent.slice(0, -1) + "▼";
        CARD_FORM.style.display = "none";
        CARD_TITLE.value = "";
        CARD_DESCRIPTION.value = "";
    }
});
