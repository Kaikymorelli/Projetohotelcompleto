$(document).ready(function() {
	loadGuests();

	$('#guestForm').submit(function(event) {
		event.preventDefault();
		const id = $('#guestId').val();
		if (id) {
			updateGuest(id);
		} else {
			addGuest();
		}
	});
});

function loadGuests() {
	$.getJSON('/hospedes', function(data) {
		$('#guestTableBody').empty();
		data.forEach(guest => {
			$('#guestTableBody').append(
				`<tr>
					<td>${guest.id}</td>
                    <td>${guest.nome}</td>
                    <td>${guest.telefone}</td>
                    <td>${guest.cpf}</td>
                    <td>${guest.endereco}</td>
                    <td>${guest.email}</td>
                    <td>
                    	<button class="btn btn-sm btn-warning" onclick="showEditGuestForm(${guest.id}, '${guest.nome}','${guest.telefone}', '${guest.cpf}', '${guest.endereco}','${guest.email}')">Edit</button>
                    	<button class="btn btn-sm btn-danger" onclick="deleteGuest(${guest.id})">Delete</button>
                    </td>
                 </tr>`
			);
		});
	});
}

function showAddGuestForm() {
	$('#formTitle').text('Add hospede');
	$('#guestId').val('');
	$('#guestNome').val('');
	$('#guestTelefone').val('');
	$('#guestCpf').val('');
	$('#guestEndereco').val('');
	$('#guestEmail').val('');
	$('#guestFormModal').show();
}

function showEditGuestForm(id, nome,telefone, cpf, enderco, email) {
	$('#formTitle').text('Edit Hospede');
	$('#guestId').val(id);
	$('#guestNome').val(nome);
	$('#guestTelefone').val(telefone);
	$('#guestCpf').val(cpf);
	$('#guestEndereco').val(enderco);
	$('#guestEmail').val(email);
	$('#guestFormModal').show();
}

function closeGuestForm() {
	$('#guestFormModal').hide();
}

function addGuest() {
	const guest = {
		nome: $('#guestNome').val(),
		telefone: $('#guestTelefone').val(),
		cpf: $('#guestCpf').val(),
		endereco: $('#guestEndereco').val(),
		email: $('#guestEmail').val()
	};
	$.ajax({
		url: '/hospedes',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(guest),
		success: function() {
			closeGuestForm();
			loadGuests();
		}
	});
}

function updateGuest(id) {
	const guest = {
		name: $('#guestNome').val(),
		telefone: $('#guestTelefone').val(),
		cpf: $('#guestCpf').val(),
		endereco: $('#guestEndereco').val(),
		email: $('#guestEmail').val()
	};
	$.ajax({
		url: `/hospedes/${id}`,
		type: 'PUT',
		contentType: 'application/json',
		data: JSON.stringify(guest),
		success: function() {
			closeGuestForm();
			loadGuests();
		}
	});
}

function deleteGuest(id) {
	if (confirm('Realmente vai deletar?')) {
		$.ajax({
			url: `/hospedes/${id}`,
			type: 'DELETE',
			success: function() {
				loadGuests();
			}
		});
	}
}