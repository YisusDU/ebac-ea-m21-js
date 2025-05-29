//Viernes 23 de mayo-- 8.45pm
Muy bien estoy recien retomando el vanilla JS, ahora vamos a hacer algunos scripts para tomar datos del formulario 
Acabo de reorganizar las carpetas de los assets dentro de IMG, y he editado todas las direcciones img src o similiares con control shif l, me he ahorrado un montonal
de tiempo, pero ahora sigue enfrentarse directamente al JS, justo cree la carpeta con el archivo y lo conecté al html para pasar el script intruso de la clase pasada

Ahora vamos con la primera instruccion para mí:
identifica los elementos del formulario y de la lista en el DOM para manipularlos. Implementa una función que capture los datos del formulario cuando se presione
 "Registrar" y almacénalos en una lista o array. 

Ya he apuntado al formulario correctamente para notar que los label y los input necesitan name y for
He decido darle una leida a la activad que envié en este módulo antes de la actualización

Leyendo el codigo viejo sobre el primer E commerce con JS vanilla, he notado que tenia codigo repetido e innecesario, asi que lo eliminé y actualicé el repo en la nube
tambien he notado que el contador de objetos dentro del carrito no baja al eliminar los objetos del carrito con el boton de eliminar, habrá que arreglarlo con la menor 
intervencion de IA antes de hacer algo bien aquí.

He terminado de hacer los ajustes necesarios, me tardé de más porque me confundí sobre el directorio correspondiente al repositori
remoto, y dado que ese trabajo se utilizó como referencia en Linkedin, no podía dejarlo a medias, entonces añadí interacciones,
estilos y responsividad, además de mejorar la estructura del HTML.

Sin más preambulos, a darle aqui que es para mañana.

*Incluye validaciones básicas para evitar que los campos estén vacíos y para garantizar que el número de guía sea único, por ejemplo, mostrando
 algún mensaje en color rojo cuando no se complete un campo.

*Implementa en la Lista de Guías mediante botones o un menú desplegable para permitir a los usuarios actualizar el estado de cada guía, asegurándose
de que el flujo respete el orden definido (como de "Pendiente" a "En tránsito"). Los cambios deben reflejarse también en el Panel de Estado General,
actualizando los contadores de guías activas, en tránsito y entregadas automáticamente.


//He notado que la tabla estaba mal, pues le faltaba una columna, la de destinatario, la he corrgido pero necesito ajustar los estilos responsivos
    Quiza sea bueno añadir title a cada input con una descripción de lo que debe introducir

Vamos a tabajar un poco los estilos sobre el header y la tabla con la nueva responsividad

Ya añadí los estilos del header para responsividad, solo falta agregar el js para manipularlos
Modifiqué los estilos del mixin active para que tambien funcionen en dispositivos móviles


Añadí unos estilos geniales al header y estuve experimentando con transform, como en giros x, y y perspectiva 3D
//***Descubrí un bug en el formulario
    Si solo añades el estado del envío en cualquier valor menos el inicial, aunque los demás esten vacíos
    el formulario sí se envía

    El bug era causado por que si si teníamos campos llenos y campos vacios, si el ultimo campo estaba lleno, se asignaba
    isValid = true, lo que permitía enviar el formulario, hemos eliminado esa característica del else que valida el formulario


//Ahora vamos a hacer una funcion para actualizar el estado desde la tabla
    Estoy rediseñando la tabla para que obtenga los datos de la ultima actualización del envío.
    Para ello modifiqué primeramente la estructura del array guideListe, para que contenga objetos interacciones
    con pares entre la fecha y la actualización correspondiente

    Necesito ajustar el registro del formulario para incluir los subobjetos

//Ya creamos la funcion en cada botón Actualizar Estado, falta completarla
    para completarla falta usar un forEach en cada objeto dentro del .guide__stage y crear filas con cada dato
    usar appendChild a table__currentGuide--body para añadir las filas con los datos
    usar el formulario para añadir etapas a .guide__stage
    asegurarme de vaciar table__currentGuide--body cada vez que cierre el modal

//Ya he añadido las funciones necesarias para que funcionen los modales
/*-*/-Descubrí un bug, que ya arreglé, si antes de registrar una nueva guia, querias ver el historial o actualizar el estado
    se podía sin problemas
        Despues de registrar otra guia, se reenderizaba otra vez la tabla, duplicandola, y estos nuevos elementos no estaban incluidos
        en los querys que seleccionan todos los botones de historial o actualizar, por lo que no llamaban a las funciones de los modales
        /*  para arreglarlo, tuve que redeclarar los querys dentro de la funcion que hace submit, ya que llama paintTable
            que genera nuevas filas, con los mismos datos, y ahora se incluyen en los querys y llaman a las funciones 

    --Falta--> 
        *Añadir una función al formulario del modal update para actualizar el estado✅
        *Añadir un campo al registro de guías y al modalUpdate para que capturemos la hora ✅
            -Añadimos a la hora automáticamente al registrar el formulario, y podemos verla en el historial y actualizar ✅
        *estilizar cada modal✅
        **quiero agregar una funcion de que cuando hagas click en cualquier input
        se eliminen los estilos de error en los formularios ✅
        **Hay un bug en el formulario de update, si añades una guía, seleccionas un estado nuevo, pero cierras el modal antes de hacer submit, 
        las opciones no se reestablecen✅
        **Hay un bug en el header con los iconos de menu y close✅
        *hacer que el estado general se actualice con los datos del guideArray✅
        **Añadir estilos responsivos a las tablas de los modales✅
        **Evitar que los formularios puedan agregar una fecha posterior a la actual✅
        **Un capricho, hacer que el header te siga al hacer scroll✅

        **Subir los archivos a un repositorio de git
        **Preguntar que show con los links a Buscar guías e historial de guías

