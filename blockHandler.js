document.addEventListener("DOMContentLoaded", function(){

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

    reload(); // Delete buttons loaded  

    CARD_ADD.addEventListener("click", function(){
        if(CARD_FORM.style.display === "none"){
            CARD_ADD.textContent = CARD_ADD.textContent.slice(0, -1) + "▲";
            CARD_FORM.style.display = "inline";
        }
        else {
            CARD_ADD.textContent = CARD_ADD.textContent.slice(0, -1) + "▼";
            CARD_FORM.style.display = "none";
        }
    });

    SUBMIT_CARD.addEventListener("click", function(){
        render(CARD_TITLE.value, CARD_DESCRIPTION.value, today);
        reload();
    });

    function render(title, description, dueDate) {
        let uncompletedTasks = document.getElementById('uncompletedTasks');
        let task = `
        <td class="taskCard">
            <h2 class="cardTitle">>> ${title}</h2>
            <p>${description}</p>
            <p>${dueDate}</p>
            <div align="center">
                <span class="delete" style="color: red;">X</span><span class="moveLeft"><</span><span class="moveRight">></span>
            </div>
        </td>`

        uncompletedTasks.innerHTML += task;
    }

    function reload(){
        Array.from(deleteCard).forEach(function(card){
            card.addEventListener('click', function(){
                if(confirm("Are you sure you want to delete this task?")){
                    card.parentNode.parentNode.parentNode.removeChild(card.parentNode.parentNode);
                }
            });
        });
    }
});