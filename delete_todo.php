<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $id = $data['id'];

    $conn = new mysqli('localhost', 'root', '', 'todo_app');

    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed']);
        exit;
    }

    $stmt = $conn->prepare('DELETE FROM todos WHERE id = ?');
    $stmt->bind_param('i', $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete todo']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}
?>
