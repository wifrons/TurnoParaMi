let contador=0;
let flagnombre=false;
let flagedad=false;
let flagtelefono=false
let flagObraSocial=false;
let nombreUsuario;
let edadUsuario;
let telefonoUsuario;
let opcion;
let validacion;
let observacion;
let descuentoPorObraSocial;
let descuentoPorPago;
let pagoTotal;
let precioPorMedioPago;

let precioConsulta=17500;

let flagCitaReservada=false;
let flagMesValido = false;
let mesParaCita;
let mesCita;

let year;
let isDivisible100;
let isBisiesto;
let isDivisible400;
let isDivisible4;

const porcentaje = function (a) { return a * (10/100) };

class cliente{
    constructor(nombre, diaTurno, obraSocial, telefono, estadoPago){
        this.Nombre = nombre.toUpperCase();
        this.DiaTurno = diaTurno;
        this.ObraSocial = obraSocial.toUpperCase();
        this.Telefono = telefono;
        this.EstadoPago = estadoPago;
    }
}

//#region functiones

function validar(nombre,opcion)
{
    const VALIDAR=1;    

    //let regex = /[0-9]+/;
    let regex = new RegExp('^[A-Z]+$', 'i')
    let regexNum = new RegExp('^[0-9]+$', 'i')

    let retorno = false;

    if(opcion==VALIDAR)
    {
        // console.log("validando el nombre");
        if(regex.test(nombre))
            retorno=true;
    }
    else
    {
        // console.log("validando la edad");
        if(regexNum.test(nombre))
            retorno=true;
    }

    return retorno;   
}

function bisiesto()
{
    const fecha = new Date();
    year = fecha.getFullYear();

    
    isDivisible4 = (year % 4) == 0 ? true : false;
    isDivisible100 = (year % 100) == 0 ? true : false;
    isDivisible400 = (year % 400) == 0 ? true : false;
    
    if((isDivisible4==true && isDivisible100==false) || (isDivisible4==true && isDivisible100==true && isDivisible400==true))
        isBisiesto=true;
    else
        isBisiesto=false;
    return isBisiesto;
}

function descuentoxobrasocial()
{
    switch(obraSocial)
    {
        case "OSDE":
            descuentoPorObraSocial=(60/100); //60%
            // console.log(obraSocial + " con 60%  de descuento en la consulta");
        break;
        case "PAMI":
            descuentoPorObraSocial=(45/100); //45%
            // console.log(obraSocial + " con 45%  de descuento en la consulta");
        break;
        case "MONOTRIBUTO":
            descuentoPorObraSocial=(20/100); //20%
            // console.log(obraSocial + " con 20%  de descuento en la consulta");
        break;
        default:
            // console.log("Lo lamentamos para " + obraSocial + " no disponemos descuentos en la consulta");
            descuentoPorObraSocial=0;
        break;    
    }    
}

function totalconsulta()
{
    descuentoxobrasocial();

    pagoTotal  = precioConsulta - (precioConsulta * descuentoPorObraSocial);

    //precioPorEfectivo = pagoTotal - (pagoTotal * (10/100)); //se descuenta el 10%
    precioPorEfectivo = pagoTotal - (porcentaje(pagoTotal)); //se descuenta el 10%
    //precioPorTarjeta=pagoTotal + (pagoTotal * (10/100)); //se adiciona el 10% en la consulta
    precioPorTarjeta=pagoTotal + (porcentaje(pagoTotal)); //se adiciona el 10% en la consulta

}

function mesreserva(mesactual)
{
    switch(mesactual)
    {
        case 0:
            mesParaCita = "FEB-MAR-ABR";
        break;
        case 1:
            mesParaCita = "MAR-ABR-MAY";
        break;
        case 2:
            mesParaCita = "ABR-MAY-JUN";
        break;
        case 3:
            mesParaCita = "MAY-JUN-JUL";
        break;
        case 4:
            mesParaCita = "JUN-JUL-AGO";
        break;
        case 5:
            mesParaCita = "JUL-AGO-SEP";
        break;
        case 6:
            mesParaCita = "AGO-SEP-OCT";
        break;
        case 7:
            mesParaCita = "SEP-OCT-NOV";
        break;
        case 8:
            mesParaCita = "OCT-NOV-DIC";
        break;
        case 9:
            mesParaCita = "NOV-DIC-ENE";
        break;
        case 10:
            mesParaCita = "DIC-ENE-FEB";
        break;
        case 11:
            mesParaCita = "ENE-FEB-MAR";
            break;
        default:
            mesParaCita = "none";
        break;

    }
}

function cantdia(messeleccionado)
{
    // alert(messeleccionado);
    if((messeleccionado=="ABR") || (messeleccionado=="JUN") || (messeleccionado=="SEP") || (messeleccionado=="NOV"))
    {
        cantDia=30;
    }
      
    else if(messeleccionado=="ENE" || messeleccionado=="MAR" || messeleccionado=="MAY" || messeleccionado=="AGO" || messeleccionado=="OCT" || messeleccionado=="DIC")
        cantDia=31;
    else
    {
        // console.log("estoy entrando aca");
        let sbiesto = bisiesto();
        cantDia = sbiesto == true ? 29 : 28;
    }    
}

function imprimirticketturno()
{
    console.log("----------DATOS DEL TURNO------");
    console.log("Nombre: " + nombreUsuario);
    console.log("Edad: " + edadUsuario);
    console.log("Telefono: " + telefonoUsuario);
    console.log("ObraSocial: " + obraSocial);
    console.log("Observacion: " + observacion);
    console.log("Su turno fue asignado para el " + diaCita + "/" + mesCita);
    console.log("----------------------------------");

    totalconsulta();
    console.log("-> Monto a pagar = " + pagoTotal + " incluido el descuento por su obra social de " + descuentoPorObraSocial*100 + "%.");
    console.log("-> Recuerde que si cancela en efectivo tiene un descuento del 10% sobre el pago total quedando\n Monto a Pagar = " + precioPorEfectivo);
    console.log("-> Recuerde que si abona con tarjeta tiene un recargo del 10% sobre el pago total quedando\n Monto a Pagar = " + precioPorTarjeta);   
    console.log("Gracias por preferirnos...Lo esperamos....");
}

//#endregion functions

let bienvenido = confirm("BIENVENIDO AL SISTEMA DE GESTION DE TURNOS DE UNILAB\n\n Deseas Agendar un turno con Nosotros? 📆");

if(bienvenido)
{
    while(true)
    {
        if(flagnombre==false)
        {
            nombreUsuario = prompt("Ingrese su nombre");
            if(nombreUsuario!=null && nombreUsuario!="")
            {
                opcion=1;
                validacion = validar(nombreUsuario,opcion);
                if(validacion)
                {
                    // console.log("Hola "+ nombreUsuario);
                    flagnombre=true;
                }
            
            }
        }
        if(flagedad==false && flagnombre==true)
        {
            edadUsuario = prompt("Ingrese su edad");
            opcion=2;
        
            // console.log("edadUsuario: " + edadUsuario);
            if(edadUsuario !=null && edadUsuario!="")
            {
                validacion = validar(edadUsuario,opcion);
                // console.log("1..edadUsuario: " + edadUsuario);
                if(validacion)
                {
                    edadUsuario=parseInt(edadUsuario);                    
                    // console.log("2..edadUsuario: " + edadUsuario);
                    if(edadUsuario>=0 && edadUsuario<100)
                    {
                        if(edadUsuario==0)
                        {
                            observacion = "Infante";
                        }
                        else if(edadUsuario>70 && edadUsuario<100)
                        {
                            observacion="Adulto Mayor";
                        }
                        else
                            observacion="---";
                        // console.log("Paciente: " + nombreUsuario + " edad: " + edadUsuario);
                        flagedad=true;
                    }
                    else
                        alert("Debe Ingresar una edad valida");                
                }

            }
        }
        if(flagtelefono==false && flagedad==true)
        {
            telefonoUsuario = prompt("Ingrese su nro de telefono","3475210566");

            if(telefonoUsuario==null || telefonoUsuario=="")
            {
                telefonoUsuario="Sin Registro";
            }
            else
            {
                opcion=2;
                validacion=validar(telefonoUsuario,opcion);
                if(validacion)
                {
                    if(telefonoUsuario.length>=8 && telefonoUsuario.length<=10)
                    {
                        // console.log("Paciente: " + nombreUsuario + " edad: " + edadUsuario + " Telefono: " + telefonoUsuario);
                        flagtelefono=true;
                    }
                    else
                    {
                        alert("Ingrese un Telefono valido");
                    }
                }
            }
        }
        if(flagObraSocial == false && flagtelefono==true)
        {
            obraSocial = prompt("Indique su Obra Social si posee","OSDE");

            if(obraSocial==null || obraSocial=="")
            {
                obraSocial="Sin ObraSocial";
            }
            flagObraSocial=true;
            break;
        }
    }
    
    //Tengo los datos del usuario ahora reservare el turno
    do
    {
        const fecha = new Date();
        let mes = fecha.getMonth();
        // console.log(mes);

        mesreserva(mes);

        if(flagMesValido==false)
        {
            // console.log(mesParaCita);
            let cadena = "Ingrese el mes a reservar [" + mesParaCita +" ]";
        
            mesCita = prompt(cadena);
        
            // console.log("mescita: " + mesCita);
            mesCita = mesCita.toUpperCase();  
            flagMesValido=true;            
            // flagMesValido=true;
        }

        if(mesParaCita.includes(mesCita) )
        {
        //    console.log("mes..cita: " + mesCita);
            cantdia(mesCita);
            diaCita = parseInt(prompt("Ingrese un dia entre 1 y " + cantDia ));        
            if(diaCita>=1 && diaCita<=cantDia)
            {
                flagCitaReservada = true;
                alert("Su turno fue asignado satisfactoriamente para el " + diaCita + "/" + mesCita + ". \n Te esperamos...");
                imprimirticketturno();
            }
            else
                alert("Por favor ingrese un dia valido."); 
        }
        else
            alert("Debe indicar un mes del establecido.");
    // console.log("hola");
    } while( ( typeof( mesCita ) != 'string' ) || ( mesCita.length == 0 )  || flagCitaReservada==false);
}
else
{
    alert("💫 Regresa cuando lo necesites......")
}
