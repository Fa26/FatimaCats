import { useState } from 'react';
import { HfInference } from '@huggingface/inference';
import './styleBot.css';

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
    candidate_labels: ['react_projects', 'about_me', 'other', 'react','github','git',],
  },
});
  const topLabel = classification[0].label;
const confidence = classification[0].score;

      // 2. Generar respuesta según la etiqueta
      let botResponse = '';

      if (topLabel === 'react' && confidence > 0.3) {
        botResponse = `
          ¡SURE! 
          Here some of my React projects:
          - **React App **:--- https://github.com/tuusuario/todo-app
          Look my git here -- https://github.com/Fa26
        `;
      }else if (topLabel === 'git' && confidence > 0.3) { 
        botResponse = `
          You can find all my projects on my GitHub profile: https://github.com/Fa26`
      }
      
    else if (topLabel === 'about_me' || confidence < 0.6) {
        botResponse = `
          Hi! my name is Fatima! I am a developer with over 3 years of experience.
          I am passionate about creating interactive experiences and learning new technologies.
          Would you like to know more specific information?
        `;
      } else {
        botResponse = 'Sorry, I didn\'t understand your question. You can ask me about my React skills or my projects.';
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
    <div class="text-2xl" className="chatbot-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'You:' : 'Bot:'}</strong>
            <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }} />
          </div>
        ))}
        {loading && <div className="loading">Writting...</div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder=" Ask something... about me or my projects"
        />
        <button onClick={sendMessage} disabled={loading}>
        Send
        </button>
      </div>
    </div>
  );


}

export default ChatBot;