import React, { useState } from 'react';
import './index.css';
import jsPDF from 'jspdf';
import antetImage from './imgs/antetImage.jpg'; // Antetli kağıdın resminin dosya yolu

const Data = () => {
  const [students, setStudents] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', age: 20, email: "orn@gmail.com", phone: "123", dateofbirth: "01.01.2004" },
    { id: 2, firstName: 'Jane', lastName: 'Smith', age: 22, email: "orn2@gmail.com", phone: "456", dateofbirth: "01.01.2002" },
    { id: 3, firstName: 'Alice', lastName: 'Johnson', age: 21, email: "orn3@gmail.com", phone: "789", dateofbirth: "01.01.2003" }
  ]);

  const handleExportToPDF = (id) => {
    const student = students.find(student => student.id === id);

    if (student) {
      const pdf = new jsPDF();

      // Antetli kağıdın resmini direkt arkaplan yapma
      pdf.addImage(antetImage, 'JPEG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);

      // Bilgileri ekleme
      pdf.setFontSize(14);
      pdf.setFont('times', 'bold'); // Font tipi: Times, stil: Bold
      
      // Uzun metni düzenleme
      const textLines = pdf.splitTextToSize(`LoremLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. "${student.firstName}"`, pdf.internal.pageSize.width - 40);
      
      // Satırları tek tek ekleme
      textLines.forEach((line, index) => {
        pdf.text(line, 20, 70 + (index * 10)); // İkinci parametrede satır aralığını ayarlayabilirsiniz
      });

      pdf.text(`First Name: ${student.id}`, 20, 150);
      pdf.text(`Last Name: ${student.lastName}`, 20, 160);
      pdf.text(`Age: ${student.age}`, 20, 170);
      pdf.text(`Email: ${student.email}`, 20, 180);
      pdf.text(`Phone: ${student.phone}`, 20, 190);
      pdf.text(`Date of Birth: ${student.dateofbirth}`, 20, 2000);

      pdf.save(`Student_${student.id}_Info.pdf`);
    }
  };

  return (
    <div className='Data'>
      <label>Enter Student ID:</label>
      <input type="text" id="studentId" />

      <button onClick={() => {
        const studentId = document.getElementById('studentId').value;
        handleExportToPDF(parseInt(studentId, 10));
      }}>
        Export to PDF
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email </th>
            <th>Phone </th>
            <th>Date of Birth </th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.dateofbirth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data;
