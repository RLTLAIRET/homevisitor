<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once 'PHPMailer/Exception.php';
require_once 'PHPMailer/PHPMailer.php';
require_once 'PHPMailer/SMTP.php';

// recibiendo varaiables

$json = file_get_contents('php://input');
$obj = json_decode($json);

$nombre=$obj->nombre;
$correo=$obj->correo;
$telefono=$obj->telefono;
$mensaje=$obj->mensaje;
$asunto=$obj->asunto;
$archivo=$obj->archivo;


$mail = new PHPMailer(true);

try {
    $mail->SMTPOptions = array(
        'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
        )
        );
    //Server settings
    $mail->SMTPDebug = 0;                                       //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'mail.visitor-plu.c';                       //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'contacto@visitor-plus.cl';                     //SMTP username
    $mail->Password   = '6$EB_3$yBhOf';                           //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('contacto@visitor-plus.cl', 'Visitor Plus');
    $mail->addAddress($correo, $nombre);     //Add a recipient
    // $mail->addAddress('ellen@example.com');               //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    // Attachments
    if ($archivo){
        $mail->addAttachment($archivo);         //Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    }

    //Content
    $mail->isHTML(true);    
    if (!$asunto) {
        $mail->Subject = 'Contacto WEB :'. $nombre;  
    } else {
        $mail->Subject = $asunto;  
    }                          //Set email format to HTML
    $mail->AltBody = 'cuerpo adicional';
    $mail->Body    = "
    <table border='0' cellspacing='3' cellpadding='2'>
    <tr>
    <td width='30%' align='left' bgcolor='#f0efef'><strong>Nombre:</strong></td>
    <td width='80%' align='left'>$nombre</td>
    </tr>

    <tr>
    <td align='left' bgcolor='#f0efef'><strong>E-mail:</strong></td>
    <td align='left'>$correo</td>
    </tr>

    <tr>
    <td width='30%' align='left' bgcolor='#f0efef'><strong>Telefono:</strong></td>
    <td width='70%' align='left'>$telefono</td>
    </tr>
    
    
    </table>
    <h5>$mensaje</h5>
    ";

    $mail->send();
    echo 'El Mensaje ha sido Enviado';
} catch (Exception $e) {
    echo "Hubo un error no pudimos emviar el mensaje: {$mail->ErrorInfo}";
}