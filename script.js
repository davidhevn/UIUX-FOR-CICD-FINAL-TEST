// Sample data for 20 university students
let students = [
    { id: 1, studentId: "STU001", fullName: "John Michael Anderson", className: "CS101", address: "123 Main Street, New York, NY 10001", phoneNumber: "+1-555-0101" },
    { id: 2, studentId: "STU002", fullName: "Emily Rose Johnson", className: "CS102", address: "456 Oak Avenue, Los Angeles, CA 90001", phoneNumber: "+1-555-0102" },
    { id: 3, studentId: "STU003", fullName: "David William Smith", className: "EE201", address: "789 Pine Road, Chicago, IL 60601", phoneNumber: "+1-555-0103" },
    { id: 4, studentId: "STU004", fullName: "Sarah Elizabeth Brown", className: "ME301", address: "321 Elm Street, Houston, TX 77001", phoneNumber: "+1-555-0104" },
    { id: 5, studentId: "STU005", fullName: "Michael James Davis", className: "CS101", address: "654 Maple Drive, Phoenix, AZ 85001", phoneNumber: "+1-555-0105" },
    { id: 6, studentId: "STU006", fullName: "Jessica Ann Wilson", className: "CS103", address: "987 Cedar Lane, Philadelphia, PA 19101", phoneNumber: "+1-555-0106" },
    { id: 7, studentId: "STU007", fullName: "Christopher Lee Martinez", className: "EE202", address: "147 Birch Boulevard, San Antonio, TX 78201", phoneNumber: "+1-555-0107" },
    { id: 8, studentId: "STU008", fullName: "Amanda Marie Garcia", className: "ME302", address: "258 Spruce Court, San Diego, CA 92101", phoneNumber: "+1-555-0108" },
    { id: 9, studentId: "STU009", fullName: "Daniel Robert Rodriguez", className: "CS102", address: "369 Willow Way, Dallas, TX 75201", phoneNumber: "+1-555-0109" },
    { id: 10, studentId: "STU010", fullName: "Lauren Nicole Lewis", className: "CS104", address: "741 Ash Street, San Jose, CA 95101", phoneNumber: "+1-555-0110" },
    { id: 11, studentId: "STU011", fullName: "Matthew Thomas Walker", className: "EE203", address: "852 Poplar Avenue, Austin, TX 78701", phoneNumber: "+1-555-0111" },
    { id: 12, studentId: "STU012", fullName: "Olivia Grace Hall", className: "ME303", address: "963 Chestnut Road, Jacksonville, FL 32201", phoneNumber: "+1-555-0112" },
    { id: 13, studentId: "STU013", fullName: "Andrew Joseph Allen", className: "CS103", address: "159 Magnolia Drive, Fort Worth, TX 76101", phoneNumber: "+1-555-0113" },
    { id: 14, studentId: "STU014", fullName: "Sophia Marie Young", className: "CS105", address: "357 Cypress Lane, Columbus, OH 43201", phoneNumber: "+1-555-0114" },
    { id: 15, studentId: "STU015", fullName: "Ryan Patrick King", className: "EE204", address: "468 Fir Street, Charlotte, NC 28201", phoneNumber: "+1-555-0115" },
    { id: 16, studentId: "STU016", fullName: "Emma Rose Wright", className: "ME304", address: "579 Hemlock Boulevard, San Francisco, CA 94101", phoneNumber: "+1-555-0116" },
    { id: 17, studentId: "STU017", fullName: "Nathan Alexander Lopez", className: "CS104", address: "680 Juniper Court, Indianapolis, IN 46201", phoneNumber: "+1-555-0117" },
    { id: 18, studentId: "STU018", fullName: "Isabella Jane Hill", className: "CS106", address: "791 Redwood Way, Seattle, WA 98101", phoneNumber: "+1-555-0118" },
    { id: 19, studentId: "STU019", fullName: "Tyler Benjamin Scott", className: "EE205", address: "802 Sequoia Avenue, Denver, CO 80201", phoneNumber: "+1-555-0119" },
    { id: 20, studentId: "STU020", fullName: "Mia Elizabeth Green", className: "ME305", address: "913 Sycamore Road, Washington, DC 20001", phoneNumber: "+1-555-0120" }
];

let currentPage = 1;
const studentsPerPage = 10;
let editingStudentId = null;
let deleteStudentId = null;
let filteredStudents = [...students];

// DOM Elements
const studentsTableBody = document.getElementById('studentsTableBody');
const addStudentBtn = document.getElementById('addStudentBtn');
const studentModal = document.getElementById('studentModal');
const deleteModal = document.getElementById('deleteModal');
const studentForm = document.getElementById('studentForm');
const searchInput = document.getElementById('searchInput');
const closeModal = document.getElementById('closeModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const cancelBtn = document.getElementById('cancelBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const modalTitle = document.getElementById('modalTitle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderStudents();
    setupEventListeners();
});

function setupEventListeners() {
    addStudentBtn.addEventListener('click', openAddModal);
    closeModal.addEventListener('click', closeStudentModal);
    closeDeleteModal.addEventListener('click', closeDeleteModalFunc);
    cancelBtn.addEventListener('click', closeStudentModal);
    cancelDeleteBtn.addEventListener('click', closeDeleteModalFunc);
    studentForm.addEventListener('submit', handleFormSubmit);
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    searchInput.addEventListener('input', handleSearch);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === studentModal) closeStudentModal();
        if (e.target === deleteModal) closeDeleteModalFunc();
    });
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredStudents = [...students];
    } else {
        filteredStudents = students.filter(student => 
            student.studentId.toLowerCase().includes(searchTerm) ||
            student.fullName.toLowerCase().includes(searchTerm) ||
            student.className.toLowerCase().includes(searchTerm) ||
            student.address.toLowerCase().includes(searchTerm) ||
            student.phoneNumber.includes(searchTerm)
        );
    }
    
    currentPage = 1;
    renderStudents();
}

function renderStudents() {
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const studentsToShow = filteredStudents.slice(startIndex, endIndex);
    
    studentsTableBody.innerHTML = '';
    
    if (studentsToShow.length === 0) {
        studentsTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <p>No students found</p>
                </td>
            </tr>
        `;
    } else {
        studentsToShow.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.studentId}</td>
                <td>${student.fullName}</td>
                <td>${student.className}</td>
                <td>${student.address}</td>
                <td>${student.phoneNumber}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-edit" onclick="editStudent(${student.id})">Edit</button>
                        <button class="btn btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
                    </div>
                </td>
            `;
            studentsTableBody.appendChild(row);
        });
    }
    
    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            Previous
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `
                <button onclick="changePage(${i})" class="${i === currentPage ? 'active' : ''}">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += `<span>...</span>`;
        }
    }
    
    // Next button
    paginationHTML += `
        <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            Next
        </button>
    `;
    
    // Page info
    const startIndex = (currentPage - 1) * studentsPerPage + 1;
    const endIndex = Math.min(currentPage * studentsPerPage, filteredStudents.length);
    paginationHTML += `
        <span class="pagination-info">
            Showing ${startIndex}-${endIndex} of ${filteredStudents.length} students
        </span>
    `;
    
    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderStudents();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function openAddModal() {
    editingStudentId = null;
    modalTitle.textContent = 'Add New Student';
    studentForm.reset();
    studentModal.style.display = 'block';
    document.getElementById('studentId').disabled = false;
}

function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    editingStudentId = id;
    modalTitle.textContent = 'Edit Student';
    document.getElementById('studentId').value = student.studentId;
    document.getElementById('fullName').value = student.fullName;
    document.getElementById('className').value = student.className;
    document.getElementById('address').value = student.address;
    document.getElementById('phoneNumber').value = student.phoneNumber;
    document.getElementById('studentId').disabled = true;
    studentModal.style.display = 'block';
}

function deleteStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    deleteStudentId = id;
    document.getElementById('deleteStudentInfo').textContent = 
        `${student.studentId} - ${student.fullName}`;
    deleteModal.style.display = 'block';
}

function confirmDelete() {
    if (deleteStudentId) {
        students = students.filter(s => s.id !== deleteStudentId);
        filteredStudents = filteredStudents.filter(s => s.id !== deleteStudentId);
        
        // Adjust page if needed
        const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }
        
        renderStudents();
        closeDeleteModalFunc();
    }
}

function closeStudentModal() {
    studentModal.style.display = 'none';
    studentForm.reset();
    editingStudentId = null;
}

function closeDeleteModalFunc() {
    deleteModal.style.display = 'none';
    deleteStudentId = null;
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        studentId: document.getElementById('studentId').value.trim(),
        fullName: document.getElementById('fullName').value.trim(),
        className: document.getElementById('className').value.trim(),
        address: document.getElementById('address').value.trim(),
        phoneNumber: document.getElementById('phoneNumber').value.trim()
    };
    
    // Validation
    if (!formData.studentId || !formData.fullName || !formData.className || 
        !formData.address || !formData.phoneNumber) {
        alert('Please fill in all fields');
        return;
    }
    
    if (editingStudentId) {
        // Update existing student
        const index = students.findIndex(s => s.id === editingStudentId);
        if (index !== -1) {
            students[index] = {
                ...students[index],
                ...formData
            };
            
            // Update filtered list if student is in it
            const filteredIndex = filteredStudents.findIndex(s => s.id === editingStudentId);
            if (filteredIndex !== -1) {
                filteredStudents[filteredIndex] = students[index];
            }
        }
    } else {
        // Add new student
        // Check if student ID already exists
        if (students.some(s => s.studentId === formData.studentId)) {
            alert('Student ID already exists. Please use a different ID.');
            return;
        }
        
        const newId = Math.max(...students.map(s => s.id), 0) + 1;
        const newStudent = {
            id: newId,
            ...formData
        };
        
        students.push(newStudent);
        
        // Add to filtered list if matches current search
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '' || matchesSearch(newStudent, searchTerm)) {
            filteredStudents.push(newStudent);
        }
    }
    
    renderStudents();
    closeStudentModal();
}

function matchesSearch(student, searchTerm) {
    return student.studentId.toLowerCase().includes(searchTerm) ||
           student.fullName.toLowerCase().includes(searchTerm) ||
           student.className.toLowerCase().includes(searchTerm) ||
           student.address.toLowerCase().includes(searchTerm) ||
           student.phoneNumber.includes(searchTerm);
}

