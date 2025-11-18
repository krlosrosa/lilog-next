// Esta linha é OBRIGATÓRIA.
// Ela diz ao Next.js que este componente deve rodar no navegador, não no servidor.
'use client';

import { useUser } from '@/_shared/providers/UserContext';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

// --- Compartilhando Tipos ---
// Em um projeto real (Monorepo), você importaria isso de um pacote 'common'.
// Aqui, vamos apenas redefinir o tipo que o back-end espera (baseado no Zod).
type NotificationDto = {
  type: string;
  message: string;
};

// URL do nosso servidor NestJS (do .env.local)
const SERVER_URL =
  process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || 'http://localhost:3000';

export default function HomePage() {
  const { user } = useUser();
  // Estado para armazenar a instância do socket
  const [socket, setSocket] = useState<Socket | null>(null);

  // Estado para a lista de notificações recebidas
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);

  // Estado para o status da conexão
  const [isConnected, setIsConnected] = useState(false);

  // --- Estados para o formulário de envio ---
  const [formMessage, setFormMessage] = useState('');
  const [formType, setFormType] = useState('chat'); // Ex: 'chat', 'log', etc.

  // --- Efeito Principal: Conexão e Listeners ---
  useEffect(() => {
    // 1. Inicializa a conexão com o socket
    const newSocket = io(SERVER_URL, {
      transports: ['websocket'],
      auth: { token: user?.id },
    });
    setSocket(newSocket);

    // --- 2. Define os Listeners (Ouvintes) de eventos ---

    newSocket.on('connect', () => {
      console.log('✅ Conectado ao servidor Socket.io!');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Desconectado do servidor Socket.io.');
      setIsConnected(false);
    });

    // Evento de boas-vindas (do 'handleConnection' do NestJS)
    newSocket.on('connectionSuccess', (data: { message: string }) => {
      console.log('Mensagem do servidor:', data.message);
    });

    // Evento principal: 'notificationToClient' (disparado pelo back-end)
    newSocket.on('notificationToClient', (payload: NotificationDto) => {
      console.log('Nova notificação recebida:', payload);
      // Adiciona a nova notificação à lista (de forma imutável)
      setNotifications((prevNotifications) => [...prevNotifications, payload]);
    });

    // --- 3. Função de Limpeza (Cleanup) ---
    // Isso é MUITO importante. Garante que, quando o componente
    // for "desmontado" (ex: trocar de página), a conexão é fechada.
    return () => {
      console.log('Desconectando socket...');
      newSocket.disconnect();
      setSocket(null);
    };

    // O array vazio [] garante que este useEffect rode apenas UMA VEZ
  }, []);

  // --- Função para Enviar Mensagem ao Servidor ---
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (socket && formMessage) {
      const payload: NotificationDto = {
        type: formType,
        message: formMessage,
      };

      // Emite o evento 'messageToServer' que o back-end está ouvindo
      socket.emit('messageToServer', payload);

      // Limpa o input
      setFormMessage('');
    }
  };

  // --- Renderização (UI) ---
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Next.js + NestJS Socket.io</h1>

      <p>
        Status da Conexão:
        <strong style={{ color: isConnected ? 'green' : 'red' }}>
          {isConnected ? ' Conectado' : ' Desconectado'}
        </strong>
      </p>

      <hr />

      <h3>Enviar Mensagem para o Servidor</h3>
      <form onSubmit={handleSendMessage}>
        <div>
          <label>Tipo: </label>
          <input
            type="text"
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            style={{ marginRight: '10px' }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Mensagem: </label>
          <input
            type="text"
            value={formMessage}
            onChange={(e) => setFormMessage(e.target.value)}
            style={{ marginRight: '10px' }}
          />
        </div>
        <button
          type="submit"
          disabled={!isConnected}
          style={{ marginTop: '10px' }}
        >
          Enviar (evento 'messageToServer')
        </button>
      </form>

      <hr />

      <h3>Notificações Recebidas (do evento 'notificationToClient')</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {notifications.map((notif, index) => (
          <li
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '8px',
              marginBottom: '5px',
            }}
          >
            <strong>Tipo:</strong> {notif.type} <br />
            <strong>Mensagem:</strong> {notif.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
