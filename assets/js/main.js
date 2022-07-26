var id = 0;
var tr_id = 0;
var is_edit = false;
var user = {};
var data_button_position = "";

$(document).ready(function (){
    $("body")
        .on("click", "#reset_form_btn", resetForm)                  /* This will reset the form */
        .on("input", "#simple_form input:text", validateSimpleFormInputs)     /* This will validate user input everytime they changed the value */
        .on("submit", "#simple_form", submitSimpleForm)             /* This will submit simple form */
        .on("click", "#edit_data_btn", editData)                    /* This will edit the data from the table */
        .on("click", "#delete_data_btn", deleteData)                /* This will delete the data from the table */
        .on("click", ".arrow_down_icon", moveDataToLowerTable)      /* This will move the data from upper to lower table */
        .on("click", ".arrow_up_icon", moveDataToUpperTable);       /* This will move the data from lower to upper table */
});

/*
    * DOCU: This function will validate the email address of the user's input
    * Last Updated Date: July 21, 2022
    * @function
    * @author Alfie Osayan
*/
function validateEmail(email){
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/*
    * DOCU: This function will reset to default the form
    * Last Updated Date: July 21, 2022
    * @function
    * @author Alfie Osayan
*/
function resetForm(){
    $("#first_name, #last_name, #email").val("");
    $("input").removeClass("input_error");
    $("input").removeClass("input_valid");
    $("#add_form_btn").html("Add");
}

/*
    * DOCU: This function will submit the form data to the table
    * Last Updated Date: July 26, 2022
    * @function
    * @author Alfie Osayan
*/
function submitSimpleForm(event){
    event.preventDefault();

    /* if all inputs are valid or true */
    if (validateSimpleFormInputs()) {
        user = {
            "first_name": $("#first_name").val(),
            "last_name": $("#last_name").val(),
            "email": $("#email").val(),
        }

        /* if all inputs are to be updated or newly created */
        if (is_edit) {
            $(`#${tr_id}`).html(`<td>${user.first_name}</td><td>${user.last_name}</td><td>${user.email}</td><td>
                <button id="edit_data_btn" type="button"><span>Edit</span></button>
                <button type="button"><span class="${data_button_position}"></span></button>
                <button id="delete_data_btn" type="button"><span class="delete_icon"></span></button>
                </td>`
            );
        }
        else {
            id++;
            data_button_position = "arrow_down_icon";

            $("#upper_data_table").append(`<tr id="${id}"><td>${user.first_name}</td><td>${user.last_name}</td><td>${user.email}</td><td>
                <button id="edit_data_btn" type="button"><span>Edit</span></button>
                <button type="button"><span class="${data_button_position}"></span></button>
                <button id="delete_data_btn" type="button"><span class="delete_icon"></span></button>
                </td>`
            );
        }

        resetForm();
    }
    else {
        alert("Invalid Input/s");
    }
};

/*
    * DOCU: This function will edit the data of the user in the table
    * Last Updated Date: July 26, 2022
    * @function
    * @author Alfie Osayan
*/
function editData() {
    let closest_tr = $(this).closest("tr");

    tr_id = closest_tr.attr("id");
    data_button_position = $(this).nextAll("button:first").find("span").attr("class");

    let first_name = closest_tr.find("td:first-child").text();
    let last_name = closest_tr.find("td:nth-child(2)").text();
    let email = closest_tr.find("td:nth-child(3)").text();
    
    $("#first_name").val(first_name);
    $("#last_name").val(last_name);
    $("#email").val(email);
    $("#add_form_btn").html("Update");

    is_edit = true;
}

/*
    * DOCU: This function will delete the data of the user in the table
    * Last Updated Date: July 26, 2022
    * @function
    * @author Alfie Osayan
*/
function deleteData() {
    /* if the user confirms the delete confirmation */
    if (confirm("Are you sure you want to delete?")) {
        $(this).closest("tr").remove();
    }
}

/*
    * DOCU: This function will move the data to the lower table
    * Last Updated Date: July 26, 2022
    * @function
    * @author Alfie Osayan
*/
function moveDataToLowerTable(){
    data_button_position = "arrow_up_icon";

    $("#lower_data_table").append(`<tr id="${id}"><td>${user.first_name}</td><td>${user.last_name}</td><td>${user.email}</td><td>
        <button id="edit_data_btn" type="button"><span>Edit</span></button>
        <button type="button"><span class="${data_button_position}"></span></button>
        <button id="delete_data_btn" type="button"><span class="delete_icon"></span></button>
        </td>`
    );

    $(this).closest("tr").remove();
};

/*
    * DOCU: This function will move the data to the upper table
    * Last Updated Date: July 26, 2022
    * @function
    * @author Alfie Osayan
*/
function moveDataToUpperTable(){
    data_button_position = "arrow_down_icon";

    $("#upper_data_table").append(`<tr id="${id}"><td>${user.first_name}</td><td>${user.last_name}</td><td>${user.email}</td><td>
        <button id="edit_data_btn" type="button"><span>Edit</span></button>
        <button type="button"><span class="${data_button_position}"></span></button>
        <button id="delete_data_btn" type="button"><span class="delete_icon"></span></button>
        </td>`
    );

    $(this).closest("tr").remove();
};

/*
    * DOCU: This function validates user input
    * Last Updated Date: July 26, 2022
    * @function
    * @author Alfie Osayan
*/
function validateSimpleFormInputs(){
    let email = $("#email").val();
    let simple_form_inputs = $("#simple_form input");
    let is_input_valid = false;

    simple_form_inputs.each(function () {
        let selected_input = $(this);
        /* if simple form input is not empty and has no whitespaces */
        selected_input.val() !== "" && hasNoWhiteSpace(selected_input.val()) ?
            selected_input.addClass("input_valid").removeClass("input_error") :
            selected_input.addClass("input_error").removeClass("input_valid");
    });

    /* if the email is a valid email */
    validateEmail(email) ? $("#email").addClass("input_valid").removeClass("input_error") : $("#email").addClass("input_error").removeClass("input_valid");

    /* if form inputs has errors */
    is_input_valid = simple_form_inputs.hasClass("input_error") ? false : true;

    return is_input_valid;
}

/*
    * DOCU: This function checks if a string has white spaces
    * Last Updated Date: July 26, 2022
    * @function
    * @author Alfie Osayan
*/
function hasNoWhiteSpace(string) {
    return string.trim().length !== 0;
}
