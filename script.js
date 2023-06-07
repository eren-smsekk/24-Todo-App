// let gorevListesi = [
        //     {"id": 1, "gorevAdi": "Görev 1", "durum": "completed"},
        //     {"id": 2, "gorevAdi": "Görev 2", "durum": "completed"},
        //     {"id": 3, "gorevAdi": "Görev 3", "durum": "completed"},
        //     {"id": 4, "gorevAdi": "Görev 4", "durum": "completed"},
        // ]

        let gorevListesi = [];

        if(localStorage.getItem("gorevListesi") !== null) {
            gorevListesi = JSON.parse(localStorage.getItem("gorevListesi"));
        }
        let taskInput = document.getElementById("taskName");

        let editID;
        let isEditTask = false;

        displayTask("all");

        function displayTask(filter) {
            ul = document.getElementById("task-list");
            ul.innerHTML = "";
            if(gorevListesi.length == 0) {
                ul.innerHTML = "<p class='px-2 py-3 m-0'>Görev Listeniz Boş !!</p>";
            } else {
                for(let gorev of gorevListesi) {

                    let completed = gorev.durum == "completed" ? "checked" : "";
                    if(filter == gorev.durum || filter == "all") {
                            let li = `
                            <li class = "task list-group-item align-middle">
                                <div class = "form-check">
                                    <input type="checkbox" onclick='updateStatus(this)' class="form-check-input" ${completed} name="" id="${gorev.id}"/>
                                    <label for="${gorev.id}" class="form-check-label ${completed}">${gorev.gorevAdi}</label>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-three-dots"></i>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a onclick='editTask(${gorev.id}, "${gorev.gorevAdi}")' class="dropdown-item" href="#"><i class="bi bi-pencil-square"></i> Düzenle</a></li>
                                        <li><a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><i class="bi bi-trash3-fill"></i> Sil</a></li>
                                    </ul>
                                </div>
                            </li>
                        `;
                        ul.insertAdjacentHTML("beforeend", li);
                    }
                }
            }
        }
        


        const ekleButton = document.querySelector("#ekleBtn");
        const temizleButton = document.querySelector("#temizleBtn");
        const filters = document.querySelectorAll(".filters span");

        ekleButton.addEventListener("click", function(event) {
            
            if(taskInput.value == "") {
                alert("Lütfen Görev Giriniz!!")
            } else {
                if(!isEditTask){
                    gorevListesi.push({"id": gorevListesi.length + 1, "gorevAdi": taskInput.value});
                } else {
                    for(let gorev of gorevListesi) {
                        if(gorev.id == editID) {
                            gorev.gorevAdi = taskInput.value;
                        }
                        isEditTask = false;
                    }
                }
                taskInput.value = "";
                displayTask(document.querySelector("span.active").id);
                localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
            }
            event.preventDefault();
        })

        temizleButton.addEventListener("click", function() {
            let clearValue = document.querySelector('#taskName');
            if(!clearValue.value == "") {
                clearValue.value = "";
            }
            gorevListesi.splice(0, gorevListesi.length);
            displayTask();
        })

        
        function deleteTask(id) {
            let deletedId;
            for(let index in gorevListesi) {
                if(gorevListesi[index].id == id) {
                    deletedId = index;
                }
            }
            gorevListesi.splice(deletedId, 1);
            localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
            displayTask(document.querySelector("span.active").id);
        }

        function editTask(taskId, taskName) {
            editID = taskId;
            isEditTask = true;
            taskInput.value = taskName;
            taskInput.focus();
            taskInput.classList.add("active");
            console.log("Edit ID : ", editID);
            console.log("MOD : ", isEditTask);
        }

        function updateStatus(selectedTask) {
            let label = selectedTask.nextElementSibling;
            let durum;

            if(selectedTask.checked) {
                label.classList.add("checked");
                durum = "completed";
            } else {
                label.classList.remove("checked");
                durum = "pending";
            }

            for(let gorev of gorevListesi) {
                if(gorev.id == selectedTask.id) {
                    gorev.durum = durum;
                }
            }
            localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
            console.log(gorevListesi);
        }

        for(let span of filters) {
            span.addEventListener("click", function() {
                document.querySelector("span.active").classList.remove("active");
                span.classList.add("active");
                displayTask(span.id);
            })
        }
        localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));