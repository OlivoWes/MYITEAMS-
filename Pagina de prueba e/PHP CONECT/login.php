<?php
// Datos de conexión a la base de datos
$servername = "127.0.0.1"; // Nombre del servidor
$username = "root"; // Nombre de usuario de la base de datos
$password = ""; // Contraseña de la base de datos
$database = "myiteams_db"; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener los datos del formulario de inicio de sesión
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre_usuario = $_POST['nombre_usuario'];
    $contraseña = $_POST['contraseña'];

    // Consulta para verificar si el usuario y la contraseña coinciden en la base de datos
    $sql = "SELECT * FROM usuarios WHERE nombre_usuario='$nombre_usuario' AND contraseña='$contraseña'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Usuario autenticado correctamente
        echo "Inicio de sesión exitoso";
        // Aquí puedes redirigir al usuario a otra página después del inicio de sesión
    } else {
        // Usuario o contraseña incorrectos
        echo "Nombre de usuario o contraseña incorrectos";
    }
}

// Cerrar la conexión
$conn->close();
?>