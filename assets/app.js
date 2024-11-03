if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
    });
}
// Define default contacts
const defaultContacts = [
    {
        category: 'Business',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        notes: 'Important client'
    },
    {
        category: 'Personal',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '987-654-3210',
        notes: 'Friend from college'
    }
];
document.addEventListener('DOMContentLoaded', function() {
    // Initialize modal
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
});
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems); // Initialize modal

    const aboutLink = document.querySelector('#mobile-menu a[href="#about"]');
    aboutLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        const modalInstance = M.Modal.getInstance(document.getElementById('contactModal'));
        modalInstance.open(); // Open the modal
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var sidenavElems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavElems);
    var modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems);
    var selectElems = document.querySelectorAll('select');
    M.FormSelect.init(selectElems);
});

function openAddContactModal() {
    var instance = M.Modal.getInstance(document.getElementById('add-contact-modal'));
    instance.open();
}

function openFilterPopup() {
    var instance = M.Modal.getInstance(document.getElementById('filter-popup'));
    instance.open();
}

function openSortPopup() {
    var instance = M.Modal.getInstance(document.getElementById('sort-popup'));
    instance.open();
}

// Toggle Search Bar Visibility
function toggleSearchBar() {
    const searchBar = document.getElementById('search-bar');
    searchBar.style.display = searchBar.style.display === 'none' || searchBar.style.display === '' ? 'block' : 'none';
}
document.addEventListener('DOMContentLoaded', () => {
    const modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems);

    const sidenavElems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavElems, {
        edge: 'right' // Open the sidenav from the right
    });
    loadContacts();
    document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);
});

document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);

    loadContacts();
    document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);
});

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
// contacts = [...defaultContacts, ...contacts];

let isEditing = false;
let currentEditIndex = null;

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (isEditing) {
        // Update the existing contact
        contacts[currentEditIndex] = {
            category: document.getElementById('category').value,
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            notes: document.getElementById('notes').value
        };
        isEditing = false;
        currentEditIndex = null;
    } else {
        // Add a new contact
        const newContact = {
            category: document.getElementById('category').value,
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            notes: document.getElementById('notes').value
        };
        contacts.push(newContact);
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
    document.getElementById('contact-form').reset();
    M.Modal.getInstance(document.getElementById('add-contact-modal')).close();
}

function loadContacts() {
    const contactListDiv = document.getElementById('contact-list');
    contactListDiv.innerHTML = '';
    // Display default contacts without edit/delete buttons
    defaultContacts.forEach(contact => {
        contactListDiv.innerHTML += `
            <div class="card mb-3">
                <div class="card-content row">
                    <div class="col s10">
                        <span class="new badge ${contact.category === 'Business' ? 'blue' : 'green'}"
                              data-badge-caption="">
                            ${contact.category}
                        </span>
                        <span class="card-title">${contact.firstName} ${contact.lastName}</span>
                        <div class="valign-wrapper mb-2">
                            <i class="material-icons blue-text text-lighten-2">phone</i>
                            <span class="mx-3">${contact.phone}</span>
                        </div>
                        <div class="valign-wrapper mb-3">
                            <i class="material-icons blue-text text-lighten-2">email</i>
                            <span class="mx-3">${contact.email}</span>
                        </div>
                        <div class="valign-wrapper mb-2">
                            <i class="material-icons blue-text text-lighten-2">note</i>
                            <span class="mx-3">${contact.notes}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    // Display user-added contacts with edit/delete buttons
    contacts.forEach((contact, index) => {
        contactListDiv.innerHTML += `
      <div class="card mb-3">
    <div class="card-content row">
        <div class="col s10">
          <span class="new badge ${contact.category === 'Business' ? 'blue' : 'green'}" 
                  data-badge-caption="">
                ${contact.category}
            </span>
            <span class="card-title">${contact.firstName} ${contact.lastName}</span>
            <div class="valign-wrapper mb-2">
                <i class="material-icons blue-text text-lighten-2">phone</i>
                <span class="mx-3">${contact.phone}</span>
            </div>
            <div class="valign-wrapper mb-3">
                <i class="material-icons blue-text text-lighten-2">email</i>
                <span class="mx-3">${contact.email}</span>
            </div>
            <div class="valign-wrapper mb-2">
                <i class="material-icons blue-text text-lighten-2">note</i>
                <span class="mx-3">${contact.notes}</span>
            </div>
        </div>
        
        <div class="col s2 right-align">
            <i class="material-icons blue-text edit-icon" onclick="editContact(${index})">edit</i><br><br>
            <i class="material-icons red-text delete-icon" onclick="removeContact(${index})">delete</i>
        </div>
    </div>
</div>



        `;
    });
}

function removeContact(index) {
    if (confirm('Are you sure you want to delete this contact?')) {
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
    }
}

function editContact(index) {
    const contact = contacts[index];
    document.getElementById('category').value = contact.category;
    document.getElementById('first-name').value = contact.firstName;
    document.getElementById('last-name').value = contact.lastName;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('notes').value = contact.notes;

    // Set editing flags
    isEditing = true;
    currentEditIndex = index;

    M.Modal.getInstance(document.getElementById('add-contact-modal')).open();
}


// Existing code to load contacts
// document.addEventListener('DOMContentLoaded', () => {
//     loadContacts();
//     document.getElementById('contact-form').addEventListener('submit', addContact);
// });

function searchContacts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredContacts = contacts.filter(contact => {
        return (
            contact.firstName.toLowerCase().includes(searchTerm) ||
            contact.lastName.toLowerCase().includes(searchTerm) ||
            contact.email.toLowerCase().includes(searchTerm) ||
            contact.notes.toLowerCase().includes(searchTerm)
        );
    });
    displayContacts(filteredContacts);
}

function displayContacts(contactsToDisplay) {
    const contactListDiv = document.getElementById('contact-list');
    contactListDiv.innerHTML = '';
    contactsToDisplay.forEach((contact, index) => {
        contactListDiv.innerHTML += `
             <div class="card mb-3">
    <div class="card-content row">
        <div class="col s10">
          <span class="new badge ${contact.category === 'Business' ? 'blue' : 'green'}" 
                  data-badge-caption="">
                ${contact.category}
            </span>
            <span class="card-title">${contact.firstName} ${contact.lastName}</span>
            <div class="valign-wrapper mb-2">
                <i class="material-icons blue-text text-lighten-2">phone</i>
                <span class="mx-3">${contact.phone}</span>
            </div>
            <div class="valign-wrapper mb-3">
                <i class="material-icons blue-text text-lighten-2">email</i>
                <span class="mx-3">${contact.email}</span>
            </div>
            <div class="valign-wrapper mb-2">
                <i class="material-icons blue-text text-lighten-2">note</i>
                <span class="mx-3">${contact.notes}</span>
            </div>
        </div>
        
        <div class="col s2 right-align">
            <i class="material-icons blue-text edit-icon" onclick="editContact(${index})">edit</i><br><br>
            <i class="material-icons red-text delete-icon" onclick="removeContact(${index})">delete</i>
        </div>
    </div>
</div>

        `;
    });
}

// Modify loadContacts to use displayContacts
// function loadContacts() {
//     displayContacts(contacts);
// }



// Apply filter based on selected categories
function applyFilter() {
    const isBusinessChecked = document.getElementById('filter-business').checked;
    const isPersonalChecked = document.getElementById('filter-personal').checked;

    // Filter contacts based on the selected categories
    const filteredContacts = contacts.filter(contact => {
        if (isBusinessChecked && contact.category === 'Business') return true;
        if (isPersonalChecked && contact.category === 'Personal') return true;
        return false;
    });

    // If no filter is selected, show all contacts
    if (!isBusinessChecked && !isPersonalChecked) {
        displayContacts(contacts);
    } else {
        displayContacts(filteredContacts);
    }

    // Close the modal after applying filter
    const filterPopupInstance = M.Modal.getInstance(document.getElementById('filter-popup'));
    filterPopupInstance.close();
}

// Display contacts with updated filtering
function displayContacts(contactList) {
    const contactListDiv = document.getElementById('contact-list');
    contactListDiv.innerHTML = '';
    contactList.forEach((contact, index) => {
        contactListDiv.innerHTML += `
               <div class="card mb-3">
    <div class="card-content row">
        <div class="col s10">
          <span class="new badge ${contact.category === 'Business' ? 'blue' : 'green'}" 
                  data-badge-caption="">
                ${contact.category}
            </span>
            <span class="card-title">${contact.firstName} ${contact.lastName}</span>
            <div class="valign-wrapper mb-2">
                <i class="material-icons blue-text text-lighten-2">phone</i>
                <span class="mx-3">${contact.phone}</span>
            </div>
            <div class="valign-wrapper mb-3">
                <i class="material-icons blue-text text-lighten-2">email</i>
                <span class="mx-3">${contact.email}</span>
            </div>
            <div class="valign-wrapper mb-2">
                <i class="material-icons blue-text text-lighten-2">note</i>
                <span class="mx-3">${contact.notes}</span>
            </div>
        </div>
        
        <div class="col s2 right-align">
            <i class="material-icons blue-text edit-icon" onclick="editContact(${index})">edit</i><br><br>
            <i class="material-icons red-text delete-icon" onclick="removeContact(${index})">delete</i>
        </div>
    </div>
</div>

        `;
    });
}


function applySort() {
    const sortOption = document.getElementById('sort-options').value;
    if (sortOption) {
        sortContacts(sortOption); // Pass the selected sort option
        const modalInstance = M.Modal.getInstance(document.getElementById('sort-popup'));
        modalInstance.close(); // Close the modal after applying sort
    } else {
        alert("Please select a sort option.");
    }
}

// Sort contacts based on the selected option
function sortContacts(sortBy) {
    // Sort contacts by the selected field
    contacts.sort((a, b) => {
        const valueA = a[sortBy] ? a[sortBy].toString().toLowerCase() : '';
        const valueB = b[sortBy] ? b[sortBy].toString().toLowerCase() : '';
        
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
    });

    // Display the sorted contacts
    displayContacts(contacts);
}

// Display contacts with updated sorting
function displayContacts(contactList) {
    const contactListDiv = document.getElementById('contact-list');
    contactListDiv.innerHTML = '';
    contactList.forEach((contact, index) => {
        contactListDiv.innerHTML += `
      <div class="card mb-3">
    <div class="card-content row">
        <div class="col s10">
          <span class="new badge ${contact.category === 'Business' ? 'blue' : 'green'}" 
                  data-badge-caption="">
                ${contact.category}
            </span>
            <span class="card-title">${contact.firstName} ${contact.lastName}</span>
            <div class="valign-wrapper mb-2">
                <i class="material-icons blue-text text-lighten-2">phone</i>
                <span class="mx-3">${contact.phone}</span>
            </div>
            <div class="valign-wrapper mb-3">
                <i class="material-icons blue-text text-lighten-2">email</i>
                <span class="mx-3">${contact.email}</span>
            </div>
            <div class="valign-wrapper mb-2">
                <i class="material-icons blue-text text-lighten-2">note</i>
                <span class="mx-3">${contact.notes}</span>
            </div>
        </div>
        
        <div class="col s2 right-align">
            <i class="material-icons blue-text edit-icon" onclick="editContact(${index})">edit</i><br><br>
            <i class="material-icons red-text delete-icon" onclick="removeContact(${index})">delete</i>
        </div>
    </div>
</div>


        `;
    });
}

