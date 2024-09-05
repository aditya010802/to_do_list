<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['todo'])) {
    $todo = $data['todo'];

    $conn = new mysqli('localhost', 'root', '', 'todo_app');

    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed']);
        exit;
    }

    $stmt = $conn->prepare('INSERT INTO todos (todo) VALUES (?)');
    $stmt->bind_param('s', $todo);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add todo']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}
?>
