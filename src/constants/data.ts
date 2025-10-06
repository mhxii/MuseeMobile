// Données des œuvres du musée avec QR codes
export const MUSEUM_ARTWORKS = [
  {
    id: '1',
    qrCode: 'MCN_LIBERTE_001',
    title: {
      fr: 'Liberté Africaine',
      en: 'African Liberty', 
      wo: 'Yoon wi Afrik'
    },
    artist: 'Monsieur M\'Bida',
    period: 'XXIe siècle',
    collection: 'Peinture Contemporaine',
    description: {
      fr: 'Une œuvre puissante représentant la liberté africaine, mêlant tradition et modernité dans un style unique.',
      en: 'A powerful artwork representing African freedom, blending tradition and modernity in a unique style.',
      wo: 'Liggéey bu baax ba di wone yoon wi Afrik, ci njaxas yi gi ak ñuul yi ci fenn wu bees.'
    },
    audioFile: {
      fr: 'liberte_africaine_fr.mp3',
      en: 'liberte_africaine_en.mp3', 
      wo: 'liberte_africaine_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=1',
    location: 'Salle 1 - Étage 1',
    dimensions: '120 x 80 cm',
    materials: 'Huile sur toile',
    acquisitionYear: 2023,
    isHighlight: true,
    tags: ['liberté', 'contemporain', 'politique', 'identité'],
    treasureHunt: {
      isPartOfHunt: true,
      huntId: 'route_or',
      riddle: {
        fr: 'Je brandis ma torche vers le ciel, symbole de liberté éternelle. Qui suis-je ?',
        en: 'I raise my torch to the sky, symbol of eternal freedom. Who am I?',
        wo: 'Dama yeg sama luus ci asama, du xel li ñu bëgg ca yoon. Lu may?'
      },
      answer: 'Liberté Africaine',
      points: 100
    }
  },
  {
    id: '2', 
    qrCode: 'MCN_MASQUE_002',
    title: {
      fr: 'Masque Rituél Dogon',
      en: 'Dogon Ritual Mask',
      wo: 'Maask Dogon'
    },
    artist: 'Artisan Dogon (Mali)',
    period: 'XVIe siècle',
    collection: 'Art Traditionnel',
    description: {
      fr: 'Masque cérémoniel utilisé lors des rites funéraires dogon, sculpté dans le bois d\'ébène avec des motifs géométriques sacrés.',
      en: 'Ceremonial mask used in Dogon funeral rites, carved from ebony wood with sacred geometric patterns.',
      wo: 'Maask bu njariñ ci riti yu Dogon yo, di jagg ci garab u ñuul ak nataal yi ñu sell.'
    },
    audioFile: {
      fr: 'masque_dogon_fr.mp3',
      en: 'masque_dogon_en.mp3',
      wo: 'masque_dogon_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=2',
    location: 'Salle 3 - Étage 2', 
    dimensions: '45 x 30 x 25 cm',
    materials: 'Bois d\'ébène, pigments naturels',
    acquisitionYear: 1995,
    isHighlight: true,
    tags: ['masque', 'rituel', 'dogon', 'sacré', 'funéraire'],
    treasureHunt: {
      isPartOfHunt: true,
      huntId: 'masques_sacres',
      riddle: {
        fr: 'Je cache le visage mais révèle l\'âme, guide les défunts vers l\'au-delà. Que suis-je ?',
        en: 'I hide the face but reveal the soul, guide the deceased to the afterlife. What am I?',
        wo: 'Dama nëb kanam waaye wone rox, di ñu toll nekk yo di dem ku nekk. Lu may?'
      },
      answer: 'Masque Rituél',
      points: 150
    }
  },
  {
    id: '3',
    qrCode: 'MCN_TEXTILE_003', 
    title: {
      fr: 'Tissage Kente Royal',
      en: 'Royal Kente Weaving',
      wo: 'Rànd Kente bu Buur'
    },
    artist: 'Maître Tisserand Ashanti',
    period: 'XVIIIe siècle',
    collection: 'Textiles et Artisanat',
    description: {
      fr: 'Magnifique textile kente aux motifs complexes, traditionnellement porté par la royauté ghanéenne lors des cérémonies importantes.',
      en: 'Beautiful kente textile with complex patterns, traditionally worn by Ghanaian royalty during important ceremonies.',
      wo: 'Rànd Kente bu rafet ak motifs yu yàgg, ku ñu tolof di laac ko buur yi Ghana ci sérémonies yu mag yu.'
    },
    audioFile: {
      fr: 'kente_royal_fr.mp3',
      en: 'kente_royal_en.mp3',
      wo: 'kente_royal_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=3',
    location: 'Salle 2 - Étage 1',
    dimensions: '200 x 150 cm',
    materials: 'Coton, soie, fils d\'or',
    acquisitionYear: 1987,
    isHighlight: false,
    tags: ['textile', 'kente', 'royal', 'ghana', 'cérémonie'],
    treasureHunt: {
      isPartOfHunt: true,
      huntId: 'artisanat_traditionnel',
      riddle: {
        fr: 'Tissé de fils d\'or et de couleurs vives, je pare les rois et raconte leur histoire. Que suis-je ?',
        en: 'Woven with golden threads and bright colors, I adorn kings and tell their story. What am I?',
        wo: 'Dama rang ak xar yu won ak melni yu bees, dama laac buur yi te wax seen tarix. Lu may?'
      },
      answer: 'Kente Royal',
      points: 120
    }
  },
  {
    id: '4',
    qrCode: 'MCN_SCULPTURE_004',
    title: {
      fr: 'Statue de Reine Mère Bénin',
      en: 'Benin Queen Mother Statue',
      wo: 'Xarma bu Lingueer Bénin'
    },
    artist: 'Sculpteur de la Cour du Bénin',
    period: 'XVIe siècle',
    collection: 'Art Traditionnel',
    description: {
      fr: 'Magnifique sculpture en bronze représentant une reine mère du royaume du Bénin, symbole de pouvoir et de sagesse.',
      en: 'Magnificent bronze sculpture depicting a queen mother from the Benin kingdom, symbol of power and wisdom.',
      wo: 'Xarma bu rafet ci bronze ba di wone lingueer bu réew Bénin, xel bu mag ak xelɓi.'
    },
    audioFile: {
      fr: 'statue_benin_fr.mp3',
      en: 'statue_benin_en.mp3',
      wo: 'statue_benin_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=4',
    location: 'Salle 4 - Étage 2',
    dimensions: '60 x 30 x 25 cm',
    materials: 'Bronze, alliage cuivre',
    acquisitionYear: 1992,
    isHighlight: true,
    tags: ['sculpture', 'bronze', 'bénin', 'royal', 'reine'],
    treasureHunt: {
      isPartOfHunt: false,
      huntId: '',
      riddle: { fr: '', en: '', wo: '' },
      answer: '',
      points: 0
    }
  },
  {
    id: '5',
    qrCode: 'MCN_CERAMIQUE_005',
    title: {
      fr: 'Poterie Nok Ancienne',
      en: 'Ancient Nok Pottery',
      wo: 'Mbotaay Nok bu Yàgg'
    },
    artist: 'Civilisation Nok (Nigeria)',
    period: '500 av. J.-C.',
    collection: 'Art Traditionnel',
    description: {
      fr: 'Tête en terre cuite de la culture Nok, l\'une des plus anciennes sculptures africaines connues.',
      en: 'Terracotta head from the Nok culture, one of the oldest known African sculptures.',
      wo: 'Bopp bu jagg ci tànk bi ci civilisation Nok, ab ci xarma yu yàgg ñu gis ci Afrika.'
    },
    audioFile: {
      fr: 'nok_pottery_fr.mp3',
      en: 'nok_pottery_en.mp3',
      wo: 'nok_pottery_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=5',
    location: 'Salle 5 - Étage 1',
    dimensions: '35 x 25 x 30 cm',
    materials: 'Terre cuite, pigments',
    acquisitionYear: 2001,
    isHighlight: false,
    tags: ['céramique', 'nok', 'antique', 'nigeria', 'terre cuite'],
    treasureHunt: {
      isPartOfHunt: false,
      huntId: '',
      riddle: { fr: '', en: '', wo: '' },
      answer: '',
      points: 0
    }
  },
  {
    id: '6',
    qrCode: 'MCN_PEINTURE_006',
    title: {
      fr: 'Marché de Dakar',
      en: 'Dakar Market',
      wo: 'Maarse Dakar'
    },
    artist: 'Issa Samb',
    period: 'XXe siècle',
    collection: 'Peinture Contemporaine',
    description: {
      fr: 'Scène vibrante d\'un marché traditionnel à Dakar, capturant l\'énergie et les couleurs de la vie quotidienne.',
      en: 'Vibrant scene of a traditional market in Dakar, capturing the energy and colors of daily life.',
      wo: 'Xëy bu moos bu maarse traditional ci Dakar, ba di gis doole ak melni yu bés yi ci bet bu bés.'
    },
    audioFile: {
      fr: 'marche_dakar_fr.mp3',
      en: 'marche_dakar_en.mp3',
      wo: 'marche_dakar_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=6',
    location: 'Salle 1 - Étage 1',
    dimensions: '150 x 100 cm',
    materials: 'Acrylique sur toile',
    acquisitionYear: 2015,
    isHighlight: true,
    tags: ['peinture', 'marché', 'dakar', 'vie quotidienne', 'couleurs'],
    treasureHunt: {
      isPartOfHunt: false,
      huntId: '',
      riddle: { fr: '', en: '', wo: '' },
      answer: '',
      points: 0
    }
  },
  {
    id: '7',
    qrCode: 'MCN_BIJOUX_007',
    title: {
      fr: 'Parure Peule en Or',
      en: 'Fulani Gold Jewelry',
      wo: 'Biir Pël bu Wóor'
    },
    artist: 'Orfèvre Peul',
    period: 'XIXe siècle',
    collection: 'Textiles et Artisanat',
    description: {
      fr: 'Ensemble de bijoux traditionnels peuls en or pur, portés lors des cérémonies de mariage.',
      en: 'Set of traditional Fulani jewelry in pure gold, worn during wedding ceremonies.',
      wo: 'Biir yi Pël yi ci wóor bu sell, bu ñu laac ci sérémonies yu téere.'
    },
    audioFile: {
      fr: 'bijoux_peul_fr.mp3',
      en: 'bijoux_peul_en.mp3',
      wo: 'bijoux_peul_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=7',
    location: 'Salle 2 - Étage 2',
    dimensions: 'Ensemble de 12 pièces',
    materials: 'Or 24 carats, perles',
    acquisitionYear: 1998,
    isHighlight: false,
    tags: ['bijoux', 'or', 'peul', 'mariage', 'tradition'],
    treasureHunt: {
      isPartOfHunt: false,
      huntId: '',
      riddle: { fr: '', en: '', wo: '' },
      answer: '',
      points: 0
    }
  },
  {
    id: '8',
    qrCode: 'MCN_INSTRUMENT_008',
    title: {
      fr: 'Kora Mandingue Ancienne',
      en: 'Ancient Mandinka Kora',
      wo: 'Kora Mandinka bu Yàgg'
    },
    artist: 'Maître Griot Kouyaté',
    period: 'XVIIIe siècle',
    collection: 'Art Traditionnel',
    description: {
      fr: 'Instrument à 21 cordes utilisé par les griots, transmettant l\'histoire orale des empires mandingues.',
      en: '21-string instrument used by griots, transmitting the oral history of Mandinka empires.',
      wo: 'Yëf ak 21 xooloo bu géwël yi jëfandikoo, ba di jox tarix bi ci wax yi réew Mandinka.'
    },
    audioFile: {
      fr: 'kora_fr.mp3',
      en: 'kora_en.mp3',
      wo: 'kora_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=8',
    location: 'Salle 6 - Étage 1',
    dimensions: '120 x 50 x 30 cm',
    materials: 'Calebasse, peau de chèvre, cordes',
    acquisitionYear: 1990,
    isHighlight: true,
    tags: ['instrument', 'musique', 'kora', 'griot', 'mandingue'],
    treasureHunt: {
      isPartOfHunt: false,
      huntId: '',
      riddle: { fr: '', en: '', wo: '' },
      answer: '',
      points: 0
    }
  },
  {
    id: '9',
    qrCode: 'MCN_MASQUE_009',
    title: {
      fr: 'Masque Dan de Côte d\'Ivoire',
      en: 'Dan Mask from Ivory Coast',
      wo: 'Maask Dan ci Côte d\'Ivoire'
    },
    artist: 'Sculpteur Dan',
    period: 'XXe siècle',
    collection: 'Art Traditionnel',
    description: {
      fr: 'Masque de danse Dan aux traits harmonieux, utilisé lors des cérémonies initiatiques.',
      en: 'Dan dance mask with harmonious features, used during initiation ceremonies.',
      wo: 'Maask Dan bu saay ak nataal yu rafet, bu ñu jëfandikoo ci sérémonies yu initiation.'
    },
    audioFile: {
      fr: 'masque_dan_fr.mp3',
      en: 'masque_dan_en.mp3',
      wo: 'masque_dan_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=9',
    location: 'Salle 3 - Étage 2',
    dimensions: '40 x 25 x 20 cm',
    materials: 'Bois, pigments naturels',
    acquisitionYear: 2005,
    isHighlight: false,
    tags: ['masque', 'dan', 'danse', 'côte d\'ivoire', 'initiation'],
    treasureHunt: {
      isPartOfHunt: false,
      huntId: '',
      riddle: { fr: '', en: '', wo: '' },
      answer: '',
      points: 0
    }
  },
  {
    id: '10',
    qrCode: 'MCN_SCULPTURE_010',
    title: {
      fr: 'Arbre de Vie Baobab',
      en: 'Baobab Tree of Life',
      wo: 'Guy mu Nekk Baobab'
    },
    artist: 'Ousmane Sow',
    period: 'XXIe siècle',
    collection: 'Peinture Contemporaine',
    description: {
      fr: 'Sculpture monumentale représentant un baobab, symbole de la vie et de la sagesse africaine.',
      en: 'Monumental sculpture depicting a baobab, symbol of African life and wisdom.',
      wo: 'Xarma bu mag ba di wone baobab, xel bu nekk ak xelɓi bu Afrika.'
    },
    audioFile: {
      fr: 'baobab_fr.mp3',
      en: 'baobab_en.mp3',
      wo: 'baobab_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=10',
    location: 'Jardin Extérieur',
    dimensions: '300 x 200 x 200 cm',
    materials: 'Fer forgé, résine',
    acquisitionYear: 2020,
    isHighlight: true,
    tags: ['sculpture', 'baobab', 'contemporain', 'monumental', 'vie'],
    treasureHunt: {
      isPartOfHunt: false,
      huntId: '',
      riddle: { fr: '', en: '', wo: '' },
      answer: '',
      points: 0
    }
  },
  {
    id: '11',
    qrCode: 'MCN_MASK_011',
    title: {
      fr: 'Masque Senoufo',
      en: 'Senoufo Mask',
      wo: 'Ndok Senoufo'
    },
    artist: 'Artisan Senoufo',
    period: 'XIXe siècle',
    collection: 'Masques Rituels',
    description: {
      fr: 'Masque cérémoniel utilisé lors des rites d\'initiation Poro, représentant un esprit protecteur.',
      en: 'Ceremonial mask used in Poro initiation rites, representing a protective spirit.',
      wo: 'Ndok bu njëkk ci rite yu Poro, ba di wone bakkan bu dëgg.'
    },
    audioFile: {
      fr: 'senoufo_fr.mp3',
      en: 'senoufo_en.mp3',
      wo: 'senoufo_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=11',
    location: 'Salle 3 - Masques',
    dimensions: '38 x 20 x 15 cm',
    materials: 'Bois, pigments naturels',
    acquisitionYear: 1985,
    isHighlight: true,
    tags: ['masque', 'senoufo', 'rituel', 'poro', 'spirituel'],
    treasureHunt: {
      isPartOfHunt: true,
      huntId: 'hunt_001',
      riddle: { 
        fr: 'Je protège les initiés dans leur passage vers l\'âge adulte',
        en: 'I protect initiates in their passage to adulthood',
        wo: 'Dama dëgg ñi di njëkk ci yoon yu mag'
      },
      answer: 'Senoufo',
      points: 25
    }
  },
  {
    id: '12',
    qrCode: 'MCN_TEXTILE_012',
    title: {
      fr: 'Bogolan Bambara',
      en: 'Bambara Mud Cloth',
      wo: 'Sëriñ Bambara'
    },
    artist: 'Collectif de tisseuses',
    period: 'XXe siècle',
    collection: 'Textiles Traditionnels',
    description: {
      fr: 'Tissu teint avec de la boue fermentée, portant des symboles ancestraux et géométriques.',
      en: 'Cloth dyed with fermented mud, bearing ancestral and geometric symbols.',
      wo: 'Sëriñ bu njëkk ak ndox, ba am xeet yu njëkk ak géométrie.'
    },
    audioFile: {
      fr: 'bogolan_fr.mp3',
      en: 'bogolan_en.mp3',
      wo: 'bogolan_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=12',
    location: 'Salle 5 - Textiles',
    dimensions: '150 x 100 cm',
    materials: 'Coton, boue fermentée',
    acquisitionYear: 1995,
    isHighlight: false,
    tags: ['textile', 'bogolan', 'bambara', 'boue', 'symboles'],
    treasureHunt: {
      isPartOfHunt: false,
      huntId: '',
      riddle: { fr: '', en: '', wo: '' },
      answer: '',
      points: 0
    }
  },
  {
    id: '13',
    qrCode: 'MCN_BRONZE_013',
    title: {
      fr: 'Tête de Reine Yoruba',
      en: 'Yoruba Queen Head',
      wo: 'Bop bu Linger Yoruba'
    },
    artist: 'Maître d\'Ifé',
    period: 'XIIe-XVe siècle',
    collection: 'Bronzes Anciens',
    description: {
      fr: 'Magnifique tête en bronze représentant une reine d\'Ifé, témoignant d\'un savoir-faire exceptionnel.',
      en: 'Magnificent bronze head representing an Ifé queen, showcasing exceptional craftsmanship.',
      wo: 'Bop bu rafet ci bronze ba di wone linger bu Ifé, ba jël xam-xam bu mag.'
    },
    audioFile: {
      fr: 'yoruba_fr.mp3',
      en: 'yoruba_en.mp3',
      wo: 'yoruba_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=13',
    location: 'Salle 2 - Bronzes',
    dimensions: '30 x 18 x 20 cm',
    materials: 'Bronze, cuivre',
    acquisitionYear: 1990,
    isHighlight: true,
    tags: ['bronze', 'yoruba', 'ifé', 'royauté', 'ancien'],
    treasureHunt: {
      isPartOfHunt: false,
      huntId: '',
      riddle: { fr: '', en: '', wo: '' },
      answer: '',
      points: 0
    }
  },
  {
    id: '14',
    qrCode: 'MCN_INSTRUMENT_014',
    title: {
      fr: 'Balafon Malinké',
      en: 'Malinké Balafon',
      wo: 'Balafon Malinké'
    },
    artist: 'Luthier traditionnel',
    period: 'XXe siècle',
    collection: 'Instruments de Musique',
    description: {
      fr: 'Instrument à percussion mélodique, ancêtre du xylophone, utilisé dans les cérémonies royales.',
      en: 'Melodic percussion instrument, ancestor of the xylophone, used in royal ceremonies.',
      wo: 'Xalam yu njëkk ci ceremoni yu linger, moroom yu xylophone.'
    },
    audioFile: {
      fr: 'balafon_fr.mp3',
      en: 'balafon_en.mp3',
      wo: 'balafon_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=14',
    location: 'Salle 6 - Musique',
    dimensions: '120 x 50 x 30 cm',
    materials: 'Bois, calebasse, peau',
    acquisitionYear: 2005,
    isHighlight: false,
    tags: ['instrument', 'balafon', 'malinké', 'percussion', 'musique'],
    treasureHunt: {
      isPartOfHunt: true,
      huntId: 'hunt_002',
      riddle: { 
        fr: 'Mes notes résonnent dans les palais des rois',
        en: 'My notes resonate in the palaces of kings',
        wo: 'Sama xalaat dañu dégg ci kër yu linger'
      },
      answer: 'Balafon',
      points: 20
    }
  },
  {
    id: '15',
    qrCode: 'MCN_SCULPTURE_015',
    title: {
      fr: 'Couple Dogon',
      en: 'Dogon Couple',
      wo: 'Njar Dogon'
    },
    artist: 'Sculpteur Dogon',
    period: 'XVIIIe siècle',
    collection: 'Sculptures Ancestrales',
    description: {
      fr: 'Sculpture représentant un couple primordial, symbole de la création et de l\'équilibre cosmique.',
      en: 'Sculpture depicting a primordial couple, symbol of creation and cosmic balance.',
      wo: 'Xarma ba di wone njar bu njëkk, xeet bu nekk ak benn-benn bu àdduna.'
    },
    audioFile: {
      fr: 'couple_dogon_fr.mp3',
      en: 'couple_dogon_en.mp3',
      wo: 'couple_dogon_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=15',
    location: 'Salle 4 - Sculptures',
    dimensions: '65 x 20 x 18 cm',
    materials: 'Bois dur, patine',
    acquisitionYear: 1988,
    isHighlight: true,
    tags: ['sculpture', 'dogon', 'couple', 'ancestral', 'cosmique'],
    treasureHunt: {
      isPartOfHunt: false,
      huntId: '',
      riddle: { fr: '', en: '', wo: '' },
      answer: '',
      points: 0
    }
  },
  {
    id: '16',
    qrCode: 'MCN_JEWELRY_016',
    title: {
      fr: 'Collier Ashanti',
      en: 'Ashanti Necklace',
      wo: 'Ngir Ashanti'
    },
    artist: 'Orfèvre Ashanti',
    period: 'XIXe siècle',
    collection: 'Bijoux Royaux',
    description: {
      fr: 'Collier en or massif orné de symboles Adinkra, porté par les dignitaires de la cour.',
      en: 'Solid gold necklace adorned with Adinkra symbols, worn by court dignitaries.',
      wo: 'Ngir bu woor ba am xeet yu Adinkra, ba ñu di tool ci kër-gu-mag.'
    },
    audioFile: {
      fr: 'ashanti_fr.mp3',
      en: 'ashanti_en.mp3',
      wo: 'ashanti_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=16',
    location: 'Salle 7 - Bijoux',
    dimensions: '45 cm de longueur',
    materials: 'Or 22 carats, perles',
    acquisitionYear: 1992,
    isHighlight: true,
    tags: ['bijou', 'ashanti', 'or', 'adinkra', 'royal'],
    treasureHunt: {
      isPartOfHunt: true,
      huntId: 'hunt_003',
      riddle: { 
        fr: 'Je brille autour du cou des nobles et porte la sagesse des anciens',
        en: 'I shine around the necks of nobles and carry the wisdom of the ancients',
        wo: 'Dama tej ci bët yu góor te am njariñ yu mag'
      },
      answer: 'Ashanti',
      points: 30
    }
  },
  {
    id: '17',
    qrCode: 'MCN_POTTERY_017',
    title: {
      fr: 'Jarre Bamana',
      en: 'Bamana Jar',
      wo: 'Mbëtt Bamana'
    },
    artist: 'Potière Bamana',
    period: 'XXe siècle',
    collection: 'Céramiques',
    description: {
      fr: 'Grande jarre de conservation décorée de motifs géométriques, utilisée pour stocker le mil.',
      en: 'Large storage jar decorated with geometric patterns, used to store millet.',
      wo: 'Mbëtt bu mag ba di wax soow, ba am xeet yu géométrie.'
    },
    audioFile: {
      fr: 'jarre_fr.mp3',
      en: 'jarre_en.mp3',
      wo: 'jarre_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=17',
    location: 'Salle 8 - Céramiques',
    dimensions: '80 x 50 cm',
    materials: 'Argile, engobe',
    acquisitionYear: 2000,
    isHighlight: false,
    tags: ['céramique', 'bamana', 'jarre', 'mil', 'quotidien'],
    treasureHunt: {
      isPartOfHunt: false,
      huntId: '',
      riddle: { fr: '', en: '', wo: '' },
      answer: '',
      points: 0
    }
  },
  {
    id: '18',
    qrCode: 'MCN_PAINTING_018',
    title: {
      fr: 'Guerriers Zoulous',
      en: 'Zulu Warriors',
      wo: 'Ceddo Zulu'
    },
    artist: 'Chéri Samba',
    period: 'XXIe siècle',
    collection: 'Peinture Contemporaine',
    description: {
      fr: 'Toile vibrante célébrant la bravoure des guerriers zoulous et leur héritage historique.',
      en: 'Vibrant canvas celebrating the bravery of Zulu warriors and their historical heritage.',
      wo: 'Nataal bu njool ba di wax fit bu ceddo yu Zulu ak tariku ñu.'
    },
    audioFile: {
      fr: 'zulu_fr.mp3',
      en: 'zulu_en.mp3',
      wo: 'zulu_wo.mp3'
    },
    imageUrl: 'https://picsum.photos/400/300?random=18',
    location: 'Galerie Moderne',
    dimensions: '180 x 150 cm',
    materials: 'Acrylique sur toile',
    acquisitionYear: 2018,
    isHighlight: true,
    tags: ['peinture', 'zulu', 'guerrier', 'contemporain', 'histoire'],
    treasureHunt: {
      isPartOfHunt: false,
      huntId: '',
      riddle: { fr: '', en: '', wo: '' },
      answer: '',
      points: 0
    }
  }
];

// Parcours de chasse au trésor
export const TREASURE_HUNTS = [
  {
    id: 'route_or',
    title: {
      fr: 'Route de l\'Or Royale',
      en: 'Royal Gold Route', 
      wo: 'Yoonu Wóor bu Buur'
    },
    description: {
      fr: 'Découvrez les trésors dorés des royaumes africains',
      en: 'Discover the golden treasures of African kingdoms',
      wo: 'Gis seen ñii gi wóor yu boole yu réew yi Afrika'
    },
    duration: 45, // minutes
    difficulty: 'medium' as const,
    artworkIds: ['1', '3'],
    totalPoints: 220,
    badge: 'gold_hunter'
  },
  {
    id: 'masques_sacres',
    title: {
      fr: 'Masques Sacrés',
      en: 'Sacred Masks',
      wo: 'Maask yi Seen'
    },
    description: {
      fr: 'Explorez les mystères des masques rituels africains',
      en: 'Explore the mysteries of African ritual masks',
      wo: 'Seet seen yi maask yu ñaari yi Afrika'
    },
    duration: 30,
    difficulty: 'easy' as const,
    artworkIds: ['2'],
    totalPoints: 150,
    badge: 'mask_explorer'
  },
  {
    id: 'artisanat_traditionnel',
    title: {
      fr: 'Artisanat Traditionnel',
      en: 'Traditional Crafts',
      wo: 'Liggéey bu Njëkk'
    },
    description: {
      fr: 'Plongez dans l\'art de l\'artisanat ancestral',
      en: 'Dive into the art of ancestral craftsmanship',
      wo: 'Dugg ci art bu liggéey yu ñi ñëw'
    },
    duration: 60,
    difficulty: 'hard' as const,
    artworkIds: ['2', '3'],
    totalPoints: 270,
    badge: 'craft_master'
  }
];

// Configuration ticketerie
export const TICKET_TYPES = [
  {
    id: 'adult',
    name: {
      fr: 'Adulte',
      en: 'Adult',
      wo: 'Mag yi'
    },
    price: 5000, // CFA
    description: {
      fr: 'Tarif standard pour les adultes',
      en: 'Standard rate for adults', 
      wo: 'Jayu normal bu mag yi'
    }
  },
  {
    id: 'student',
    name: {
      fr: 'Étudiant',
      en: 'Student',
      wo: 'Jàngatkat'
    },
    price: 2500,
    description: {
      fr: 'Tarif réduit pour les étudiants avec carte',
      en: 'Reduced rate for students with ID',
      wo: 'Jayu ndimbal bu jàngatkat yi ak karte'
    }
  },
  {
    id: 'child',
    name: {
      fr: 'Enfant (6-12 ans)',
      en: 'Child (6-12 years)',
      wo: 'Xale (6-12 at)'
    },
    price: 1500,
    description: {
      fr: 'Tarif enfant de 6 à 12 ans',
      en: 'Child rate from 6 to 12 years old',
      wo: 'Jayu xale ci 6 ba 12 at'
    }
  },
  {
    id: 'family',
    name: {
      fr: 'Famille (2 adultes + 2 enfants)',
      en: 'Family (2 adults + 2 children)',
      wo: 'Njaboot (2 mag + 2 xale)'
    },
    price: 12000,
    description: {
      fr: 'Forfait famille avantageux',
      en: 'Advantageous family package',
      wo: 'Paket njaboot bu gëm'
    }
  }
];

// Créneaux horaires
export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', 
  '14:00', '15:00', '16:00', '17:00'
];

// Langues supportées
export const SUPPORTED_LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'wo', name: 'Wolof', flag: '🇸🇳' }
];

// Collections du musée
export const MUSEUM_COLLECTIONS = [
  {
    id: 'contemporary',
    name: {
      fr: 'Peinture Contemporaine',
      en: 'Contemporary Painting',
      wo: 'Nataal bu Bii'
    },
    icon: '🎨',
    color: Colors.primary
  },
  {
    id: 'traditional',
    name: {
      fr: 'Art Traditionnel', 
      en: 'Traditional Art',
      wo: 'Art bu Njëkk'
    },
    icon: '🗿',
    color: Colors.earth
  },
  {
    id: 'textiles',
    name: {
      fr: 'Textiles et Artisanat',
      en: 'Textiles and Crafts',
      wo: 'Rànd ak Liggéey'
    },
    icon: '🧵',
    color: Colors.accent
  }
];

import { Colors } from './theme';