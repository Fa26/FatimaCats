import { useState } from 'react';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HF_TOKEN);

// Modelo para clasificar intenciones
const MODEL = 'MoritzLaurer/deberta-v3-base-zeroshot-v1';


const ChatBot = () =>{
const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // 1. Clasificar la intención con Hugging Face
    const classification = await hf.zeroShotClassification({
  model: MODEL,
  inputs: input,
  parameters: {
    candidate_labels: ['react_projects', 'about_me', 'other', 'react'],
  },
});
  const topLabel = classification[0].label;
const confidence = classification[0].score;

      // 2. Generar respuesta según la etiqueta
      let botResponse = '';

      if (topLabel === 'react' && confidence > 0.3) {
        botResponse = `
          ¡Claro que sé React! 🚀
          Aquí tienes algunos de mis proyectos con React:
          - **Mi Portfolio IA**: [GitHub](https://github.com/tuusuario/portfolio-ia) | [Demo](https://tudominio.com)
          - **App de Tareas con Hooks**: [GitHub](https://github.com/tuusuario/todo-app)
          - **Dashboard con React Router**: [GitHub](https://github.com/tuusuario/dashboard)
          También puedes ver todo mi código en [GitHub](https://github.com/tuusuario).
        `;
      } else if (topLabel === 'about_me' || confidence < 0.6) {
        botResponse = `
          Soy **Tu Nombre**, desarrollador frontend con 3 años de experiencia.
          Me especializo en React, TypeScript y Tailwind CSS.
          Me apasiona crear experiencias interactivas y aprender nuevas tecnologías.
          ¿Te gustaría saber algo más específico?
        `;
      } else {
        botResponse = 'Lo siento, no entendí bien tu pregunta. Puedes preguntarme sobre mis habilidades en React o sobre mis proyectos.';
      }

      const botMsg = { role: 'bot', content: botResponse };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'bot', content: 'Ocurrió un error. Intenta de nuevo.' }]);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="chatbot-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'Tú:' : 'Bot:'}</strong>
            <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }} />
          </div>
        ))}
        {loading && <div className="loading">Escribiendo...</div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Pregúntame sobre React o mis proyectos..."
        />
        <button onClick={sendMessage} disabled={loading}>
          Enviar
        </button>
      </div>
    </div>
  );


}

export default ChatBot;