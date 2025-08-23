window.onload = function() {
  // Elementos da tela de abertura
  const telaAbertura = document.getElementById('tela-abertura');
  const conteudoPrincipal = document.getElementById('conteudo-principal');
  const num1 = document.getElementById('num1');
  const num2 = document.getElementById('num2');
  const resposta = document.getElementById('resposta');
  const verificar = document.getElementById('verificar');
  const mensagem = document.getElementById('mensagem');


  // Gerar números aleatórios para o cálculo
  let numero1, numero2, resultadoCorreto;

  function gerarCalculo() {
    numero1 = Math.floor(Math.random() * 10) + 1;
    numero2 = Math.floor(Math.random() * 10) + 1;
    resultadoCorreto = numero1 + numero2;
    
    num1.textContent = numero1;
    num2.textContent = numero2;
  }

  // Gerar primeiro cálculo
  gerarCalculo();

  // Verificar resposta
  verificar.addEventListener('click', function() {
    const respostaUsuario = parseInt(resposta.value);
    
    if (isNaN(respostaUsuario)) {
      mostrarMensagem('Por favor, digite um número!', 'erro');
      return;
    }

    if (respostaUsuario === resultadoCorreto) {
      mostrarMensagem('Parabéns! Resposta correta! 🎉', 'sucesso');
      
      // Aguardar um pouco e então mostrar a bio
      setTimeout(() => {
        telaAbertura.style.animation = 'fadeOut 1s ease-out forwards';
        setTimeout(() => {
          telaAbertura.style.display = 'none';
          conteudoPrincipal.style.display = 'block';
          conteudoPrincipal.style.animation = 'fadeIn 1s ease-in';
        }, 1000);
      }, 1500);
    } else {
      mostrarMensagem('Ops! Tente novamente! 💪', 'erro');
      resposta.value = '';
      resposta.focus();
      
      // Gerar novo cálculo após erro
      setTimeout(() => {
        gerarCalculo();
        limparMensagem();
      }, 2000);
    }
  });

  // Permitir pressionar Enter para verificar
  resposta.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      verificar.click();
    }
  });

  // Funções auxiliares
  function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
  }

  function limparMensagem() {
    mensagem.textContent = '';
    mensagem.className = 'mensagem';
  }

  // Focar no input de resposta
  resposta.focus();

  // Adicionar animação de fadeOut
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
};