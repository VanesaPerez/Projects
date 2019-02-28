var turnos = 4;
var colores = ["Red", "Green", "Yellow","Pink"];
var puntos = 0;
var matriz = [];
var MAX_COLORES = 4;
var DIMENSION = 6;


function turnIntoColor(num) {  

  return colores[num];
}

function colorRandom() {
  return Math.floor(Math.random() * MAX_COLORES);
}

function matrix(m, n) {
  var result = []
  for (var i = 0; i < n; i++) {
    result.push(new Array(m).fill(0))
  }
  return result;
}

function generarMatrizInicial(n) {
  var m = matrix(n, n);

  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      m[i][j] = colorRandom();
    }
  }

  return m;

}

function printMatriz(n) {
  var pantalla = "\n";
  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      pantalla += turnIntoColor(matriz[i][j]) + "\t\t\t"; // Print color and white space
    }
    pantalla += "\n"; // New line
  }

  pantalla += "\n";

  return pantalla;

}

function muestraPantalla(turnos, puntuacion) {
  var screen = "";
  screen = "The grid looks as follows:\n";
  screen += printMatriz(DIMENSION);
  screen += "You have " + turnos + " turns left\n";
  screen += "Your current score is: " + puntuacion + "\n";
  screen += "Which cell do you target next?\n";

  return screen;
}

function displaceRows(saltos, j) {

  
  var i;
  // Find out where is the first -1 to delete
  for (i = 0; i < DIMENSION && matriz[i][j] != -1; i++) {

  }
  // In inicio_desplazar I save the index of the element I want to displace
  var inicio_desplazar = i - 1;
  // Displace "saltos" rows down
  for (i = inicio_desplazar; i >=0; i--) {
    matriz[i + saltos][j] = matriz[i][j];
  }
  // The "saltos" in the first lines are filled with random colors
  for (i = 0; i < saltos; i++) {
    matriz[i][j] = colorRandom();
    
  }
}


// Mark with -1 the cells I want to delete 
// Parameters: i,j (the rows are the i and the columns are the j)

function marcarElementosBorrar(i, j) { 
  var color_seleccionado = matriz[i][j];
  var puntos_turno = 1;
  var saltos = 1;

  matriz[i][j] = -1; // delete the selected



  // Check the one above: same column and row above
  if (i > 0) { // Check that I am not in the first row
    if (color_seleccionado == matriz[i - 1][j]) {
      matriz[i - 1][j] = -1;
      puntos_turno++;
      saltos++;
    }
  }
  // Check the one below: same column and row below
  if (i < DIMENSION - 1) { // Check that I am not in the last row
    if (color_seleccionado == matriz[i + 1][j]) {
      matriz[i + 1][j] = -1;
      puntos_turno++;
      saltos++;
    }
  }

  displaceRows(saltos, j);

  // Check the one on the right: same row and right column
  if (j < DIMENSION - 1) { // Check that it´s not in the last column
    if (color_seleccionado == matriz[i][j + 1]) {
      matriz[i][j + 1] = -1;
      puntos_turno++;
      displaceRows(1, j+1);

    }
  }

  // Check the one on the left: same row and left column
  if (j > 0) { // Check that it´s not in the first column
    if (color_seleccionado == matriz[i][j - 1]) {
      matriz[i][j - 1] = -1;
      puntos_turno++;
      displaceRows(1, j-1);
    }
  }
  

  return puntos_turno;

}


// MAIN PROGRAM
matriz = generarMatrizInicial(DIMENSION);

puntos=0;
do {

  var pantalla = muestraPantalla(turnos, puntos);
  pantalla += "Give me coordinates row,colum number from 1 to " + DIMENSION + ". Separate them with a , character. Example: 3,2 means row 3 and colum 2\n";
  var coordenadas = prompt(pantalla);
  var separa = coordenadas.split(","); // Separate the introduced coordinates n,m to obtain n and m separated
  
  if (separa.length!=2) {
	  alert("Invalid coordinates! The coordinates must be separated by a comma.");
  } else {
	    var x = separa[0]-1; // separa[0]=fila. Index of the selected element (substract 1 from the coordinates entered by the user)
		var y = separa[1]-1; // separa[1]=columna. Index of the selected element (substract 1 from the coordinates entered by the user)

		if (!Number.isInteger(x) || !Number.isInteger(y)) {
			alert("Invalid coordinates! They must be an integer number.");
		} else {
			
			
			if (x<0 || x>DIMENSION || y<0 || y>DIMENSION) {
				alert("Invalid coordinates! They are out of range. ");
			} else {		
				turnos--;

				var puntos_turno = marcarElementosBorrar(x, y);
				puntos =puntos+ puntos_turno;

				if (puntos_turno >= 4) turnos++;
			
			}
		}
		
		
  }

} while (turnos > 0);

var mensajefinal=printMatriz(DIMENSION);
alert(mensajefinal+"\n\nGame Over!!\n\nYour score is " + puntos + " points\n");
