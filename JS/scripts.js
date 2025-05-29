// Usarlo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    makeDraggableScroll(".list__tableContainer");
    makeDraggableScroll(".tableModal__container");
    //Actualizamos el estado general
    updateGeneralState();
    //Pintamos la tabla para que se actualice con los datos previos
    paintTable(guideList);
    //Funcion para abrir el modal y llenar la tabla despues de reenderizar la tabla al hacer submit
    const openUpdateState = document.querySelectorAll(".guide__button--updateState");
    const ModalUpdate = document.querySelector(".table__modal--update")
    renderTableModal(openUpdateState, ModalUpdate, ".table__currentGuide--body");

    const openHistory = document.querySelectorAll(".guideButton--seeHistory");
    const ModalHistory = document.querySelector(".table__modal--history");
    renderTableModal(openHistory, ModalHistory, ".tableHistory__currentGuide--body");
});

// <!--Scrip para mover la tabla con el mouse-->
const makeDraggableScroll = (selector, speed = 1.5) => {
    const containers = document.querySelectorAll(selector);
    if (!containers.length) return;

    containers.forEach(container => {
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        container.addEventListener('mousedown', e => {
            isDown = true;
            e.preventDefault(); // Evita seleccionar texto
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        ['mouseleave', 'mouseup'].forEach(event =>
            container.addEventListener(event, () => isDown = false)
        );

        container.addEventListener('mousemove', e => {
            if (!isDown) return;
            const moveX = e.pageX - container.offsetLeft;
            const walk = (moveX - startX) * speed;
            container.scrollLeft = scrollLeft - walk;
        });
    });
};


//------------Función para abrir y cerrar el menú del header en modo mobile
const buttonShow = document.querySelector(".header__menuButton--show");
const buttonClose = document.querySelector(".header__menuButton--hidde");
const linksContainer = document.querySelector(".header__linksContainer");
const buttonsContainer = document.querySelector(".header__show");


//Agregamos un evento para mostrar el menú
buttonShow.addEventListener("click", () => {
    buttonsContainer.classList.add("hidde");
    linksContainer.classList.remove("hidde");
})

//Agregamos un evento para cerrar el menú
buttonClose.addEventListener("click", () => {
    buttonsContainer.classList.remove("hidde");
    linksContainer.classList.add("hidde");
})




//Agregamos los datos a una variable de Estado general
const guideList = [
    {
        "guide__number": "12345678",
        "guide__origin": "Detroit",
        "guide__destination": "Atlanta",
        "guide__recipient": "Rick",
        guide__stage: [
            {
                "guide__date": "2025-05-25",
                "guide__status": "Pendiente",
                "guide__hour": "12:34"
            }
        ]
    },
    {
        guide__number: "12345",
        guide__origin: "Ciudad A",
        guide__destination: "Ciudad B",
        guide__recipient: "Persona X",
        guide__stage: [
            {
                guide__date: "2023-10-01",
                guide__status: "Pendiente",
                "guide__hour": "09:15"
            },
            {
                guide__date: "2023-10-02",
                guide__status: "En tránsito",
                "guide__hour": "17:42"
            }
        ]
    },
    {
        guide__number: "67890",
        guide__origin: "Ciudad C",
        guide__destination: "Ciudad D",
        guide__recipient: "Persona Y",
        guide__stage: [
            {
                guide__date: "2023-10-01",
                guide__status: "Pendiente",
                "guide__hour": "08:23"
            },
            {
                guide__date: "2023-10-02",
                guide__status: "En tránsito",
                "guide__hour": "19:08"
            }
        ]
    },
    {
        guide__number: "54321",
        guide__origin: "Ciudad E",
        guide__destination: "Ciudad F",
        guide__recipient: "Persona Z",
        guide__stage: [
            {
                guide__date: "2023-09-28",
                guide__status: "Pendiente",
                "guide__hour": "10:55"
            },
            {
                guide__date: "2023-09-29",
                guide__status: "En tránsito",
                "guide__hour": "14:27"
            },
            {
                guide__date: "2023-09-30",
                guide__status: "Entregado",
                "guide__hour": "18:36"
            }
        ]
    },
    {
        guide__number: "98765",
        guide__origin: "Ciudad G",
        guide__destination: "Ciudad H",
        guide__recipient: "Persona N",
        guide__stage: [
            {
                guide__date: "2023-10-03",
                guide__status: "Pendiente",
                "guide__hour": "15:02"
            }
        ]
    }
];

//----------------Función para obtener y almacenar los datos del formulario de registro de guías
//Apuntamos al formulario
const form = document.querySelector(".guide__form");

//------------Agregamos un evento para validar el formulario
form.addEventListener("submit", (e) => {
    //Evitamos que el formulario se envíe
    e.preventDefault();

    //Apuntamos al valor del campo de número de guía
    const guideNumber = form.elements["guide__number"].value.trim();
    //Verificamos si el número de guía ya existe
    //--------------------tambien podemos reemplazar guide["guide__number" por guide.guide__number
    const existingGuide = guideList.some(guide => guide["guide__number"] === guideNumber);
    console.log("existingGuide", existingGuide);
    //Apuntamos al campo de número de guía por su name
    const guideNumberField = form.elements["guide__number"];
    //Si el número de guía ya existe, mostramos un mensaje de error
    if (existingGuide) {
        isValid = false;
        guideNumberField.classList.add("form__input--error");
        guideNumberField.nextElementSibling.textContent = "El número de guía ya existe";
        return;
    } else {
        //Eliminamos la clase de error
        guideNumberField.classList.remove("form__input--error");
        //Eliminamos el mensaje de error
        guideNumberField.nextElementSibling.textContent = "";
    }

    //apuntamos a los campos del formulario requeridos
    const requiredFields = document.querySelectorAll(".guide__form--input");



    //Recorremos los campos requeridos
    const validForm = validateFields(requiredFields, "form__input--error", "form__input--correct");

    //Verificamos si el formulario es válido
    console.log("Formulario válido:", validForm ? "true" : "false");
    if (!validForm) {
        e.preventDefault();
        return;
    }
    //---------------Procesamos el formulario 

    //Borramos los estilos de los campos del formulario
    requiredFields.forEach((field) => {
        field.classList.remove("form__input--correct");
    });

    //Añadimos una variable para almacenar los datos del formulario
    const guideData = {};

    //Obtenemos los datos del formulario
    const formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
        //Verificamos que se hayan obtenido los datos del formulario
        //console.log(`${key} : ${value}`);

        //Vamos a validar que los campos no sean de la fecha o el estado
        if (key !== "guide__date" && key !== "guide__status") {
            guideData[key] = value;
        }
    }

    const stageObject = {
        guide__date: formData.get("guide__date"),
        guide__status: formData.get("guide__status"),
        guide__hour: formData.get("guide__hour")
    }
    guideData["guide__stage"] = [stageObject];

    console.log(guideData);

    //Mostramos un mensaje de éxito
    alert("Guía registrada con éxito");

    //Actualizamos el estado general
    guideList.push(guideData);

    //Actualizamos el estado general
    updateGeneralState();

    //Pintamos la tabla
    paintTable(guideList);

    //Funcion para abrir el modal y llenar la tabla despues de reenderizar la tabla al hacer submit
    const openUpdateState = document.querySelectorAll(".guide__button--updateState");
    const ModalUpdate = document.querySelector(".table__modal--update")
    renderTableModal(openUpdateState, ModalUpdate, ".table__currentGuide--body");

    const openHistory = document.querySelectorAll(".guideButton--seeHistory");
    const ModalHistory = document.querySelector(".table__modal--history");
    renderTableModal(openHistory, ModalHistory, ".tableHistory__currentGuide--body");


    //Vaciar los campos del formulario
    form.reset();
    //cambiar null por una key envuelta en comillas y en un array
    //console.log("Estado general:", JSON.stringify(guideList, null, 2));
    // console.log("longitud", guideList.length);
});

//----------------Función para validar los campos del formulario
const validateFields = (fieldsArray, errorClass, correctClass) => {
    let isValid = true;
    fieldsArray.forEach((field) => {
        // console.log(requiredFields);
        //Verificamos si el campo está vacío
        if (field.value.trim() === "") {


            //Añadimos la clase de error
            field.classList.add(errorClass);


            //Mostramos el mensaje de error
            field.nextElementSibling.textContent = "Este campo es obligatorio";

            //Si el campo esta vacío, no se envía el formulario
            isValid = false;
        } else {
            //Eliminamos la clase de error
            field.classList.remove(errorClass);

            //Añadimos la clase de correcto
            field.classList.add(correctClass);
            //Eliminamos el mensaje de error
            field.nextElementSibling.textContent = "";
        }
    });
    return isValid;
}

//Vamos a pintar los datos en la tabla
//Apuntamos al tbody de la tabla
const table = document.querySelector(".table__body");

//------------------Función para pintar los datos en la tabla
const paintTable = (Array) => {
    //Vaciamos la tabla para que no se duplique
    table.innerHTML = "";

    //Vamos a ciclar los datos del estado general
    Array.forEach((row) => {
        //Vamos a crear una fila
        const tr = document.createElement("tr");
        tr.classList.add("guide__table--row");

        //Vamos a crear las celdas
        const tdNumber = document.createElement("td");
        tdNumber.classList.add("guide__table--data");
        tdNumber.innerText = row.guide__number;
        tr.appendChild(tdNumber);

        const tdStatus = document.createElement("td");
        tdStatus.classList.add("guide__table--data");
        tdStatus.innerText = row.guide__stage[row.guide__stage.length - 1].guide__status;
        tr.appendChild(tdStatus);

        const tdOrigin = document.createElement("td");
        tdOrigin.classList.add("guide__table--data");
        tdOrigin.innerText = row.guide__origin;
        tr.appendChild(tdOrigin);

        const tdDestination = document.createElement("td");
        tdDestination.classList.add("guide__table--data");
        tdDestination.innerText = row.guide__destination;
        tr.appendChild(tdDestination);

        const tdRecipient = document.createElement("td");
        tdRecipient.classList.add("guide__table--data");
        tdRecipient.innerText = row.guide__recipient;
        tr.appendChild(tdRecipient);

        const tdDate = document.createElement("td");
        tdDate.classList.add("guide__table--data");
        tdDate.innerText = row.guide__stage[row.guide__stage.length - 1].guide__date;
        tr.appendChild(tdDate);

        //Botones de acción
        const tdActions = document.createElement("td");
        tdActions.classList.add("guide__table--data");
        tdActions.classList.add("list__buttonsContainer")

        const historyButton = document.createElement("button");
        historyButton.classList.add("guide__button", "guideButton--seeHistory");
        historyButton.innerText = "Ver Historial";
        tdActions.appendChild(historyButton);

        //Si ya fue entregado, no se muestra el botón de actualizar
        if (!row.guide__stage.some(element => element.guide__status === "Entregado")) {
            const updateButton = document.createElement("button");
            updateButton.classList.add("guide__button", "guide__button--updateState");
            updateButton.innerText = "Actualizar Estado";
            tdActions.appendChild(updateButton);
        }

        tr.appendChild(tdActions);

        //Agregamos la fila a la tabla
        table.appendChild(tr);
    });
}




//-------------Función para el modal de historial y actualizar el estado
const renderTableModal = (button, showContainer, destinyContainer) => {
    button.forEach((currentElement) => {
        currentElement.addEventListener("click", (e) => {
            //Eliminar clase hidde al contenedor
            showContainer.classList.remove("hiddeModal");

            //obetenemos el numero de guía
            const guideNumber = e.target.parentNode.parentNode.children[0].innerText;
            // console.log(guideNumber);

            //Buscamos el índice de la guía en el array
            const guideIndex = guideList.findIndex((guide) => guide.guide__number === guideNumber);
            // console.log(guideIndex);

            //Accedemos a la guía del array
            const currentGuide = guideList[guideIndex];
            // console.log(currentGuide);

            //Validación para las opciones del modal
            const option2 = document.querySelector(".option--2");
            const option3 = document.querySelector(".option--3");
            if (currentGuide.guide__stage.some(e => e.guide__status === "En tránsito")) {
                //eliminamos una opcion del select
                option2.style.display = "none";
                console.log("Se ocultó:", option2);
                option3.style.display = "flex";
            } else {
                //eliminamos una opcion del select
                option3.style.display = "none";
                option2.style.display = "flex";
                console.log("Se ocultó:", option3);
            }

            //Generamos las filas de la nueva tabla segun la cantidad de etapas
            currentGuide.guide__stage.forEach((stage) => {
                //Creamos una fila
                const tableRow = document.createElement("tr");
                tableRow.classList.add("tableModal__contentRow");

                //Creamos las celdas
                const modalGuideNumber = document.createElement("td");
                modalGuideNumber.classList.add("tableModal__contentData");
                modalGuideNumber.innerText = currentGuide.guide__number;
                tableRow.appendChild(modalGuideNumber);

                const modalStatus = document.createElement("td");
                modalStatus.classList.add("tableModal__contentData");
                modalStatus.innerText = stage.guide__status;
                tableRow.appendChild(modalStatus);

                const modalOrigin = document.createElement("td");
                modalOrigin.classList.add("tableModal__contentData");
                modalOrigin.innerText = currentGuide.guide__origin;
                tableRow.appendChild(modalOrigin);

                const modalDestination = document.createElement("td");
                modalDestination.classList.add("tableModal__contentData");
                modalDestination.innerText = currentGuide.guide__destination;
                tableRow.appendChild(modalDestination);

                const modalRecipient = document.createElement("td");
                modalRecipient.classList.add("tableModal__contentData");
                modalRecipient.innerText = currentGuide.guide__recipient;
                tableRow.appendChild(modalRecipient);

                const modalDate = document.createElement("td");
                modalDate.classList.add("tableModal__contentData");
                modalDate.innerText = stage.guide__date;
                tableRow.appendChild(modalDate);

                const modalHour = document.createElement("td");
                modalHour.classList.add("tableModal__contentData");
                modalHour.innerText = stage.guide__hour;
                tableRow.appendChild(modalHour);

                //Agregamos la fila a la tabla
                const tableModal = document.querySelector(destinyContainer);
                tableModal.appendChild(tableRow);
            });
        })
        //Volvemos hacer visibles las opciones del select
        const selectOptions = document.querySelectorAll("tableModal__form--option");
        selectOptions.forEach((option) => {
            option.style.display = "flex";
        });

        //Actualizamos el estado general
        updateGeneralState();

    });
}

//Funcion para abrir el modal y llenar la tabla
const openUpdateState = document.querySelectorAll(".guide__button--updateState");
const ModalUpdate = document.querySelector(".table__modal--update")
renderTableModal(openUpdateState, ModalUpdate, ".table__currentGuide--body");

const openHistory = document.querySelectorAll(".guideButton--seeHistory");
const ModalHistory = document.querySelector(".table__modal--history");
renderTableModal(openHistory, ModalHistory, ".tableHistory__currentGuide--body");


//-----------------Funcion para vaciar la tabla del modal y cerrar el modal
const closeModal = (button, cleanContainer, closeContainer) => {
    button.addEventListener("click", () => {
        //vaciamos la tabla
        const tableModal = document.querySelector(cleanContainer);
        tableModal.innerHTML = "";

        //cerramos el modal
        const sectionModal = document.querySelector(closeContainer);
        sectionModal.classList.add("hiddeModal");

        //Volvemos a añadir el formulario si ya lo contenía
        const formModal = document.querySelector(".tableModal__form");
        formModal.style.display = "flex";

        //Mostramos todas las opciones del select
        const selectOptions = document.querySelectorAll("tableModal__form--option");
        selectOptions.forEach((option) => {
            option.style.display = "flex";
        });
    });
}
//Vaciamos y cerramos el modal de actualizar estado
const closeModalUpdate = document.querySelector(".table__closeModal");
closeModal(closeModalUpdate, ".table__currentGuide--body", ".table__modal--update");

//Vaciamos y cerramos el modal de historial
const closeModalHistory = document.querySelector(".tableHistory__closeModal");
closeModal(closeModalHistory, ".tableHistory__currentGuide--body", ".table__modal--history");

//----------Funcion para actualizar el estado de la guía
//Vamos a tomar los datos del formulario
const updateStateForm = document.querySelector(".tableModal__form");
const modalInput = document.querySelectorAll(".tableModal__input");

//Vamos a tomar el boton de actualizar
const updateStateButton = document.querySelector(".tableModal__form--submit");
updateStateButton.addEventListener("click", (e) => {
    //Evitamos que el formulario se envíe
    e.preventDefault();

    //validamos los campos
    const validForm = validateFields(modalInput, "tableModal__input--error", "tableModal__input--correct");

    //Verificamos si el formulario es válido
    console.log("Formulario válido:", validForm ? "true" : "false");
    if (!validForm) {
        e.preventDefault();
        return;
    }
    //----------------Procesamos el formulario

    //Borramos los estilos de los campos del formulario
    modalInput.forEach((field) => {
        field.classList.remove("tableModal__input--correct");
    });
    //Añadimos una variable para almacenar los datos del formulario
    const updateData = {};

    //Obtenemos los datos del formulario
    const formData = new FormData(updateStateForm);
    for (let [key, value] of formData.entries()) {
        updateData[key] = value;
    }
    /* //añadimos la hora local
    const justNow = new Date();
    const timeString = justNow.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    updateData.guide__hour = timeString;
    console.log("Datos actualizados:", updateData); */

    //Vamos a añadir los datos al array
    //Para obtener el número de guía, la tabla debe tener un hijo almenos
    const tableModalBody = document.querySelector(".table__currentGuide--body");
    let modalGuideNumber = "";
    if (tableModalBody.children.length >= 1) {
        //Obtenemos el numero de guía
        modalGuideNumber = tableModalBody.children[0].children[0].innerText;
        // console.log("número de guía del modal:", modalGuideNumber);
    } else {
        alert("No se ha encontrado el número de guía");
        return;
    }
    //Buscamos el índice de la guía en el array
    const guideIndex = guideList.findIndex((numberGuide) => numberGuide.guide__number === modalGuideNumber);
    console.log("índice de la guía:", guideIndex);
    //Añadimos los datos al array
    guideList[guideIndex].guide__stage.push(updateData);

    //Actualizamos la tabla general
    paintTable(guideList);

    //Funcion para abrir el modal y llenar la tabla despues de reenderizar la tabla al hacer submit
    //Reseleccionamos los botones de actualizar estado y historial
    const openUpdateState = document.querySelectorAll(".guide__button--updateState");
    const ModalUpdate = document.querySelector(".table__modal--update")
    renderTableModal(openUpdateState, ModalUpdate, ".table__currentGuide--body");

    const openHistory = document.querySelectorAll(".guideButton--seeHistory");
    const ModalHistory = document.querySelector(".table__modal--history");
    renderTableModal(openHistory, ModalHistory, ".tableHistory__currentGuide--body");

    //Actualizamos la tabla del modal
    renderTableModalUpdated(guideList[guideIndex], ".table__currentGuide--body");

    alert("Estado actualizado con éxito");
    //Vaciamos el formulario
    updateStateForm.reset();

    //Ocultamos el formulario para evitar que se vuelva a llenar
    updateStateForm.style.display = "none";

})

//----------------Función para actualizar la tabla del modal al actualizar el estado
const renderTableModalUpdated = (currentGuide, destinyContainer) => {
    const cleanTable = document.querySelector(destinyContainer);
    cleanTable.innerHTML = "";
    currentGuide.guide__stage.forEach((stage) => {
        //Creamos una fila
        const tableRow = document.createElement("tr");
        tableRow.classList.add("tableModal__contentRow");

        //Creamos las celdas
        const modalGuideNumber = document.createElement("td");
        modalGuideNumber.classList.add("tableModal__contentData");
        modalGuideNumber.innerText = currentGuide.guide__number;
        tableRow.appendChild(modalGuideNumber);

        const modalStatus = document.createElement("td");
        modalStatus.classList.add("tableModal__contentData");
        modalStatus.innerText = stage.guide__status;
        tableRow.appendChild(modalStatus);

        const modalOrigin = document.createElement("td");
        modalOrigin.classList.add("tableModal__contentData");
        modalOrigin.innerText = currentGuide.guide__origin;
        tableRow.appendChild(modalOrigin);

        const modalDestination = document.createElement("td");
        modalDestination.classList.add("tableModal__contentData");
        modalDestination.innerText = currentGuide.guide__destination;
        tableRow.appendChild(modalDestination);

        const modalRecipient = document.createElement("td");
        modalRecipient.classList.add("tableModal__contentData");
        modalRecipient.innerText = currentGuide.guide__recipient;
        tableRow.appendChild(modalRecipient);

        const modalDate = document.createElement("td");
        modalDate.classList.add("tableModal__contentData");
        modalDate.innerText = stage.guide__date;
        tableRow.appendChild(modalDate);

        const modalHour = document.createElement("td");
        modalHour.classList.add("tableModal__contentData");
        modalHour.innerText = stage.guide__hour;
        tableRow.appendChild(modalHour);

        //Agregamos la fila a la tabla
        const tableModal = document.querySelector(destinyContainer);
        tableModal.appendChild(tableRow);
    });
}
//---------Funcion para eliminar los estilos de error en los formularios al hacer click en los campos
const input = document.querySelectorAll("input, select");
input.forEach((field) => {
    if (field.type !== "radio") {
        field.addEventListener("click", () => {
            field.classList.remove("tableModal__input--error");
            field.classList.remove("form__input--error")
            field.nextElementSibling.textContent = "";
        });
    }
});

//Funcion para actualizar el estado general
const totalGuidesActive = document.querySelector(".totalGuidesActive");
const onTransitGuides = document.querySelector(".onTransitGuides");
const deliveredGuides = document.querySelector(".deliveredGuides");

const updateGeneralState = () => {
    const active = totalGuidesActive.textContent = guideList.filter(
        e => !e.guide__stage.some(e => e.guide__status === "Entregado")
    ).length;

    const delivered = deliveredGuides.textContent = guideList.filter(
        e => e.guide__stage.some(e => e.guide__status === "Entregado")
    ).length;

    /*  const pending = guideList.filter( e => 
         e.guide__stage.some(e => e.guide__status === "Pendiente") &&
         !e.guide__stage.some(e => e.guide__status === "En tránsito")
     ).length; */
    const pending = guideList.filter(guide =>
        guide.guide__stage.some(stage => stage.guide__status === "Pendiente") &&
        !guide.guide__stage.some(stage => stage.guide__status === "En tránsito")
    ).length;

    const transit = ((guideList.length - delivered) - pending);

    onTransitGuides.textContent = transit;
}
//----Funcion para limitar el input de fecha a la fecha actual
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

const dateInput = document.querySelector("#guide__date");
const dateInputModal = document.querySelector("#guide__newDate");
dateInput.max = formattedDate;
dateInputModal.max = formattedDate;

//Función para hacer que el header cambie a position fixed al hacer scroll
const header = document.querySelector(".header");
const main = document.querySelector("main");
window.addEventListener("scroll", () => {
    if (window.scrollY > 165) {
        header.classList.add("fixed");
        main.style.marginTop = header.offsetHeight + "px";
    } else {
        header.classList.remove("fixed");
        main.style.marginTop = "0";
    }
});




