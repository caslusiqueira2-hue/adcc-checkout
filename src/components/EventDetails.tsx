import React from 'react';
import { Calendar, MapPin, Award, Zap, Check, Star } from 'lucide-react';

export const EventDetails: React.FC = () => {
  const days = [
    {
      date: '11 de Setembro, 2026',
      title: 'ADCC Amateur World Championship',
      location: 'TAURON Arena Kraków',
      description: 'O campeonato mundial amador oficial com as maiores promessas do grappling mundial brigando por contratos e reconhecimento.',
      tag: 'Abertura Oficial',
      tagColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      image: '/images/adcc-amateur.png',
    },
    {
      date: '12 e 13 de Setembro, 2026',
      title: 'ADCC World Championship 2026 (Profissional)',
      location: 'TAURON Arena Kraków',
      description: 'O ápice da luta de submissão. Finais de todas as categorias de peso, o confronto absoluto e as superlutas mais esperadas do planeta.',
      tag: 'Evento Principal',
      tagColor: 'bg-red-600/20 text-red-400 border-red-500/40',
      image: '/images/adcc-arena.jpg',
    },
  ];

  const athletes = [
    { name: 'Gordon Ryan', title: '5x Campeão ADCC', desc: 'O maior competidor no-gi da história defendendo sua hegemonia nas superlutas.' },
    { name: 'Mica Galvão', title: 'Fenômeno Mundial', desc: 'Velocidade e finalizações relâmpago que paralisam o público mundial.' },
    { name: 'Kaynan Duarte', title: 'Campeão Pesado & Absoluto', desc: 'Poder físico descomunal e jiu-jitsu cirúrgico nas divisões mais pesadas.' },
    { name: 'Ffion Davies', title: 'Campeã Mundial ADCC', desc: 'A maior estrela galesa dominando a divisão peso pena feminina.' },
    { name: 'Bia Mesquita', title: 'Lenda do Jiu-Jitsu', desc: 'Coleção lendária de títulos no tatame em busca de mais uma glória.' },
    { name: 'Irmãos Ruotolo', title: 'Kade & Tye', desc: 'O estilo mais agressivo e acrobático do grappling moderno.' },
  ];

  return (
    <section id="evento" className="py-20 bg-[#0B0C11] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>Cracóvia • Polônia • Primeira vez no Leste Europeu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-display tracking-tight">
            Programação Oficial do <span className="text-red-500">ADCC 2026</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            3 dias épicos de combates ininterruptos no lendário templo do esporte europeu, a moderna <strong className="text-white">TAURON Arena Kraków</strong>.
          </p>
        </div>

        {/* Cards dos Dias de Evento com Imagens Oficiais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {days.map((item, idx) => (
            <div
              key={idx}
              className="gradient-card rounded-3xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-300 flex flex-col group shadow-xl"
            >
              <div className="relative h-64 overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13141B] via-transparent to-black/40" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${item.tagColor} backdrop-blur-md`}>
                    {item.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-300 font-mono">
                  <span className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-lg backdrop-blur-sm">
                    <Calendar className="w-3.5 h-3.5 text-red-400" /> {item.date}
                  </span>
                  <span className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-lg backdrop-blur-sm">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> {item.location}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display uppercase group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-semibold">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Check className="w-4 h-4" /> Cobertura Completa no VIP
                  </span>
                  <span className="text-white font-mono uppercase">Transmitido ao vivo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Galeria de Atletas Confirmados */}
        <div id="atletas" className="mt-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-black/60 border border-white/10 p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest block mb-1">
                Lendas do Tatame
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-display">
                Grandes Estrelas na Disputa
              </h3>
            </div>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold uppercase tracking-wider bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/30">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Chaves & Resultados Minuto a Minuto</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {athletes.map((ath, idx) => (
              <div
                key={idx}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all hover:border-red-500/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-black text-white text-base font-display">{ath.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600/20 text-red-400 uppercase">
                    {ath.title}
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {ath.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
