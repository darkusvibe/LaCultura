<?php
session_start();

// same DB connection as login.php
$host = "localhost";
$dbname = "lacultura";
$user = "root";
$pass = "1234";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("DB connection failed: " . $e->getMessage());
}

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] === 0) {
    $allowed = ['jpg', 'jpeg', 'png', 'gif'];
    $filename = $_FILES['profile_pic']['name'];
    $filetype = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

    if (in_array($filetype, $allowed)) {
        $newname = uniqid() . "." . $filetype;
        $upload_dir = __DIR__ . "/uploads/";

        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0755, true);
        }

        if (move_uploaded_file($_FILES['profile_pic']['tmp_name'], $upload_dir . $newname)) {
            $stmt = $pdo->prepare("UPDATE users SET profile_pic = ? WHERE id = ?");
            $stmt->execute([$newname, $_SESSION['user_id']]);
        }
    }
}

header("Location: index.php");
exit;
?>
