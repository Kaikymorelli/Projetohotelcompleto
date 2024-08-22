
$(document).ready(function() {
	loadRooms();

	$('#roomForm').submit(function(event) {
		event.preventDefault();
		const id = $('#roomId').val();
		if (id) {
			updateRoom(id);
		} else {
			addRoom();
		}
	});
});

function loadRooms() {
	$.getJSON('/quarto', function(data) {
		$('#roomTableBody').empty();
		data.forEach(room => {
			$('#roomTableBody').append(
				`<tr>
					<td>${room.id}</td>
                    <td>${room.numero}</td>
                    <td>${room.qtdecamas}</td>
                    <td>
                    	<button class="btn btn-sm btn-warning" onclick="showEditRoomForm(${room.id}, '${room.numero}', '${room.qtdecamas}')">Edit</button>
                    	<button class="btn btn-sm btn-danger" onclick="deleteRoom(${room.id})">Delete</button>
                    </td>
                 </tr>`
			);
		});
	});
}

function showAddRoomForm() {
	$('#formTitle').text('Add quartos');
	$('#roomId').val('');
	$('#roomNumero').val('');
	$('#roomQtdecamas').val('');
	$('#roomFormModal').show();
}

function showEditRoomForm(id, numero, qtdecamas) {
	$('#formTitle').text('Edit Quarto');
	$('#roomId').val(id);
	$('#roomNumero').val(numero);
	$('#roomQtdecamas').val(qtdecamas);
	$('#roomFormModal').show();
}

function closeRoomForm() {
	$('#roomFormModal').hide();
}

function addRoom() {
	const room = {
		numero: $('#roomNumero').val(),
		qtdecamas: $('#roomQtdecamas').val()
	};
	$.ajax({
		url: '/quarto',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(room),
		success: function() {
			closeRoomForm();
			loadRooms();
		}
	});
}

function updateRoom(id) {
	const room = {
		numero: $('#roomNumero').val(),
		qtdecamas: $('#roomQtdecamas').val()
	};
	$.ajax({
		url: `/quarto/${id}`,
		type: 'PUT',
		contentType: 'application/json',
		data: JSON.stringify(room),
		success: function() {
			closeRoomForm();
			loadRooms();
		}
	});
}

function deleteRoom(id) {
	if (confirm('Realmente vai deletar?')) {
		$.ajax({
			url: `/quarto/${id}`,
			type: 'DELETE',
			success: function() {
				loadRooms();
			}
		});
	}
}
