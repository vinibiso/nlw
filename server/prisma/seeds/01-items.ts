import prisma from '../../src/connection';

const seed = async () => {
  const items = [
    { title: 'Lâmpadas', image: 'lampadas.svg' },
    { title: 'Pilhas e Baterias', image: 'baterias.svg' },
    { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
    { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
    { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
    { title: 'Óleo de Cozinha', image: 'oleo.svg' },
  ];

  items.forEach(async (item) => {
    await prisma.items.create({
      data: item,
    });
  });
};

seed().catch((err) => {
  throw err;
}).finally(() => {
});
