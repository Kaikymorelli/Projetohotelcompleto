$(document).ready(function() {
	loadReserva();

	$('#reservaForm').submit(function(event) {
		event.preventDefault();
		const id = $('#reservaId').val();
		if (id) {
			updateReserva(id);
		} else {
			addReserva();
		}
	});
});

function loadReserva() {
	$.getJSON('/reserva', function(data) {
		$('#reservaTableBody').empty();
		data.forEach(reserva => {
			$('#reservaTableBody').append(
				`<tr>
						<td>${reserva.hospede.nome}</td>
						<td>${reserva.quarto.numero}</td>
                       <td>${reserva.dataCheckin}</td>
                       <td>${reserva.dataCheckout}</td>
                         
                           <td>
                               <button class="btn btn-sm btn-warning" onclick="loadReservaForEdit(${reserva.id}, '${reserva.hospede.id}', '${reserva.quarto.id}', '${reserva.dataCheckin}' , '${reserva.dataCheckout}')">Edit</button>
                               <button class="btn btn-sm btn-danger" onclick="deleteReserva(${reserva.id})">Delete</button>
                           </td>
                </tr>`
			);
		});
	});
}

function showAddReservaForm() {
	$('#formTitle').text('Add Reserva');
	$('#reservaGuest').val('');
	$('#reservaRoom').val('');
	$('#reservaDateIn').val('');
	$('#reservaDateOut').val('');
	$('#reservaFormModal').show();
}


function showEditReservaForm(id,guestid, roomNumber, dataCheckin, dataCheckout) {
	$('#formTitle').text('Edit Reserva');
	$('#reservaid').val(id);
	$('#reservaGuest').val(guestid);
	$('#reservaRoom').val(roomNumber);
	$('#reservaDateIn').val(dataCheckin);
	$('#reservaDateOut').val(dataCheckout);
	$('#reservaFormModal').show();
}

function closeReservaForm() {
	$('#reservaFormModal').hide();
}

function addReserva() {
	const reserva = {
		hospede: { id: $('#reservaGuest').val() },
		quarto: { id: $('#reservaRoom').val() },
		dataCheckin: $('#reservaDatein').val(),
		dataCheckout: $('#reservaDateout').val()
	};
	console.log(reserva); // Verifique o valor aqui
	$.ajax({
		url: '/reserva',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(reserva),
		success: function() {
			closeReservaForm();
			loadReserva();
		}
	});
}


function updateReserva(id) {
	const reserva = {
		hospede: { id: $('#reservaGuest').val() },
		quarto: { id: $('#reservaRoom').val() },
		dataCheckin: $('#reservaDatein').val(),
		dataCheckout: $('#reservaDateout').val()

	};
	$.ajax({
		url: `/reserva/${id}`,
		type: 'PUT',
		contentType: 'application/json',
		data: JSON.stringify(reserva),
		success: function() {
			closeReservaForm();
			loadReserva();
		}
	});
}

function deleteReserva(id) {
	if (confirm('Deseja deletar o quarto?')) {
		$.ajax({
			url: `/reserva/${id}`,
			type: 'DELETE',
			success: function() {
				loadReserva();
			}
		});
	}
}
