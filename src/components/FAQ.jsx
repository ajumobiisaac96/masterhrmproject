import React, { useState } from 'react';
import '../components/FAQ.css'

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const faqData = [
    { question: 'What is Proxima HR, and who is it for?', answer: 'Proxima HR is tool for businesses to simplify HR task like payroll, attendance, and leave managment. its designed for HR professionals and managers who wantto save time and improve efficiency ' },
    { question: 'What features does Proxima HR include?', answer: 'It includes payroll managment, attendance tracking, employee data managment, leave tracking, reports, and more-all in one place' },
    { question: 'How easy is it to set up Proxima HR?', answer: 'setting up is quick and simple. signup, create your company profile,and import employee data effortlessly, you will be ready to go in minutes' },
    { question: 'How secure is the data stored in Proxima HR?', answer: 'Your data is encrypted and protected with industry -stanard security measure, ensuring its always safe' },
    { question: 'Is Proxima HR suitable for small businesses?', answer: 'Proxima HR caters to businessses of all sizes, including SMEs. our platform is cost effiective, user friendly, and scalable. whetheryou have 10 or 100 employees, proxima HR adapts to your needs.' },
  ];

  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="FAQ-section">
      {faqData.map((faq, index) => (
        <div key={index}>
          <div 
            className={`FAQ-question ${activeQuestion === index ? 'active' : ''}`} 
            onClick={() => toggleAnswer(index)}
          >
            {faq.question}
            <span className="FAQ-arrow">▼</span> {/* Arrow pointing downward */}
          </div>
          <div className="FAQ-answer">
            {activeQuestion === index && <p>{faq.answer}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
