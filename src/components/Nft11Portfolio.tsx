import PortfolioTemplate from './PortfolioTemplate';
import YouTubePlaylist from './YouTubePlaylist';
import { nft11Project } from '@/data/portfolio-projects';

const nft11Videos = [
  { id: 'Y3rMK8Y1XIQ', title: 'Play-to-Earn Football Manager Simulator with NFTs! How to join early! || NFT11', duration: '6:43' },
  { id: 'NOZe2yuBnvs', title: 'Interview and AMA with the NFT11 Team! || NFT11', duration: '1:09:15' },
  { id: '8S2udLC1nyk', title: 'NFT11. PREVENTA PUBLICA NFT "LEGENDS". SOLO 750!!!!', duration: '25:09' },
  { id: 'nOPPAKrOvow', title: 'Game Blockchain Mirip Football Manager Dengan Partnership Bagus - NFT11', duration: '16:52' },
  { id: 'BTVTE1JQnRY', title: 'CUIDADO! PREVENTA NFT11 - QUEDA MENOS DEL 54%', duration: '16:31' },
  { id: 'sNzSdVLfqy0', title: 'COMO ENTRAR en NFT11 | LA VERDAD | JUEGOS NFT', duration: '16:14' },
  { id: '-eLOe-BKk9I', title: 'NFT11 Metaverso esta perto de explodir! Uma semana emocionante pela frente!', duration: '16:54' },
  { id: 'PNKTRLBb2cA', title: 'Lucrei R$606,58 com a compra de dois assentos no NFT11', duration: '13:23' },
  { id: 'tGpgxbKaM-Y', title: 'O metaverso NFT11 comeca! Nova data venda dos estadios', duration: '10:44' },
  { id: '8TH1aIv_MAg', title: 'NFT11 - Adquirindo seu primeiro Legend e como vender', duration: '6:43' },
  { id: 'rD4RNierKfc', title: 'NFT11: Jogo NFT de FUTEBOL SUPER HYPADO? Como comprar o seu primeiro LEGEND!!', duration: '5:31' },
  { id: 'udf_oSjJOHA', title: 'NFT11 El mejor juego de FUTBOL!!! Se tu propio Jefe, entrenador y MANAGER!!! Nuevo NFT', duration: '22:57' },
  { id: 'r2XW8txInJc', title: 'NFT11 - COMPRANDO O TOKEN DO JOGO [NFT11] Fim do IFO', duration: '4:02' },
  { id: '6g2NNI8UhW8', title: 'NFT11 - AMA com David James! Goleiro famoso abraca o projeto', duration: '13:38' },
  { id: 'a1CI6OpHSa0', title: 'GRANDES NOVEDADES - CCAR GRATIS - PAGARON KAIJU WORLD - POSITION Y NFT11 TO THE MOON #MrCrypto', duration: '18:29' },
  { id: 'YITqu6_V0Jk', title: 'NFT11 - Como consegui o meu 1 Legend!!!! #nft11', duration: '5:23' },
  { id: 'G0BcWvsGA0E', title: 'IFO NFT11 - PREVENTA NFT11 JUEGO NFT - NOVEDADES EN ZOOGAME - Criptomonedas Gratis - TO THE MOON', duration: '20:57' },
  { id: 'f0QtY2WoIvc', title: 'NFT11 - Atualizacao Longa! Venda dos Tokens, Legends, Estadios e mais..', duration: '11:54' },
  { id: 'uUQPdryq2CU', title: 'What is NFT11? BCG NFT11! NFT11 #1', duration: '29:45' },
  { id: 'N_BwBkkH25E', title: 'NFT11 - ESTUDO WHITEPAPER! NOVO JOGO NFT! VALE A PENA? ESTILO FOOTBALL MANAGER E BRASFOOT?', duration: '2:31:33' },
  { id: 'RkrFP8kk8t4', title: 'IFO Nft11 ao vivo', duration: '7:59' },
  { id: 'zTEXK6DH8C0', title: 'NFT11 THE NEW BLOCK CHAIN PROJECT | IFO PARTICIPATION | EXCITING P2E GAME', duration: '2:33' },
  { id: '-ba6XNE26QE', title: '50% de PREVENTA del TOKEN NFT11 alcanzada. CONTINUA la venta de LEGENDARIOS y ACTUALIZACION ESTADIOS', duration: '26:17' },
  { id: 'Eg6Sk0t7Aws', title: 'OPORTUNIDAD: PREVENTA DE JUGADORES LEYENDA Y ESTADIOS DEL NUEVO JUEGO DE FUTBOL NFT11!!', duration: '12:49' },
  { id: 'xMGQUmXdPRE', title: 'NFT11 - Como conseguir o seu Legend no 2 Lote! #nft11', duration: '10:44' },
  { id: 'Wl1ay1yxxIc', title: 'Venda Publica NFT11 / Lucre 400 reais por semana na venda dos Legends!!', duration: '14:49' },
  { id: '6lIfvgfJsic', title: 'NFT GRATIS DE NUEVO JUEGO - AIRDROP DE NUEVO JUEGO - NFT11 - Criptomonedas Gratis - TO THE MOON', duration: '23:13' },
  { id: 'Uug7APSdDDs', title: 'Ganhe Dinheiro sendo um Gerente de Time no NFT11!! Aproveita vai sair agora para o publico geral!!!', duration: '19:48' },
  { id: '0gwU4qNogV0', title: 'NFT11 - TEMOS UMA DATA PARA A VENDAR DOS LEGENDS', duration: '2:51' },
  { id: 'BlDrnQCgIas', title: 'NFT 11: DICA SECRETA PARA COMPRAR O TOKEN DEPOIS DO IFO', duration: '9:33' },
  { id: 'ZDtBJ5kHrMo', title: 'Pre venda Game NFT11 (GARANTI MEU LEGEND!!)', duration: '4:37' },
  { id: '3AFIJF3hAv8', title: 'NFT 11: COMPREI MEU PRIMEIRO LEGEND', duration: '8:38' },
  { id: 'mqRljPD1DoI', title: 'NFT11 - Legends Esgotados, E agora? (Primeira Rodada de Compra IFO)', duration: '2:17' },
  { id: 'X00I8ukChT4', title: 'NFT11 - Como Incluir NFT LEGEND na carteira Metamask', duration: '1:28' },
  { id: 'rJvzJSJOlM4', title: 'NFT11 - CHEGOU A HORA DE COMPRAR SUA PRIMEIRA LENDA', duration: '13:31' },
  { id: 'prSvZpaF-aI', title: 'NFT11 - Football Manager - swietnie zapowiadajacy sie kolejny projekt sportowy', duration: '9:08' },
  { id: 'hw3Jmj5H6LE', title: 'CHANCE DE GANHAR R$5724,00 SEM GASTAR NADA - TAREFAS SIMPLES - NFT11 & BLOCKMONSTERS', duration: '6:20' },
  { id: 'ndwdTJ7HbfQ', title: 'NFT11 - Novo NFT de Futebol | POUCAS HORAS PARA ENTRAR!', duration: '15:57' },
  { id: 'ITnnS546Vq8', title: 'FUTBOL NFT!!! Nuevo JUEGO! NFT 11. Primer juego de FUTBOL MANAGER NFT. EN PANALES!!! RECORRIDA FULL', duration: '14:02' },
  { id: '1PUbuXx1HeE', title: 'IFO NFT11 COMO PROVER LIQUIDEZ, MOEDA USADA NA LIQUIDEZ JA SUBIU 150% DESDE ULTIMO VIDEO', duration: '11:50' },
  { id: '9cA4mVw8pb8', title: 'Jogo NFT de futebol - NFT11 | convidado: Filipe Vieira', duration: '1:05:36' },
  { id: 'dGcGyfVixS0', title: 'Token lancado no NFT11 - Cryptogodz vai voltar - Jogos NFT', duration: '3:14' },
  { id: 'yyFdjdHM8aY', title: 'NFT11 MANAGER DE FUTEBOL NA BLOCKCHAIN', duration: '6:39' },
  { id: 'CjqpWEmzmKE', title: 'NFT11 - TA ROLANDO A PRE-VENDA DOS LEGENDS AGORAAAA!!!', duration: '2:09:24' },
];

export default function Nft11Portfolio() {
  return (
    <PortfolioTemplate project={nft11Project}>
      <YouTubePlaylist
        title="NFT11 on YouTube"
        subtitle="Community tutorials, AMAs, and gameplay walkthroughs from the NFT11 ecosystem."
        videos={nft11Videos}
        playlistId="PLuWVUm6MCSWwQst4sXSa8I8bkdbo7jhoA"
      />
    </PortfolioTemplate>
  );
}
