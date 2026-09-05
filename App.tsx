import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { initDB } from './src/database/db';
const COLORS = {
  pink: '#FB147C',
  orange: '#FC6106',
  yellow: '#FDBF18',
  purple: '#32113C',
  ivory: '#FBF5E9',
  plum: '#70295A',
  turquoise: '#23C0BE',
  teal: '#018081',
  white: '#FFFFFF',
};

const IMAGES = {
  lupa: require('./assets/rabagu/lupa.png'),
  figuraInicio: require('./assets/rabagu/figura-inicio.png'),
  textiles: require('./assets/rabagu/textiles.png'),
  ceramica: require('./assets/rabagu/ceramica.png'),
  plantas: require('./assets/rabagu/plantas.png'),
  cuidado: require('./assets/rabagu/cuidado.png'),
  inicio: require('./assets/rabagu/inicio-2.png'),
  inicioInactivo: require('./assets/rabagu/inicio-1.png'),
  tienda: require('./assets/rabagu/tienda-1.png'),
  tiendaActiva: require('./assets/rabagu/tienda-2.png'),
  mensaje: require('./assets/rabagu/mensaje-1.png'),
  mensajeActivo: require('./assets/rabagu/mensaje-2.png'),
  perfil: require('./assets/rabagu/perfil-1.png'),
  ubicacion: require('./assets/rabagu/ubicacion.png'),
  barra: require('./assets/rabagu/barra-navegacion-1.png'),
  corazonVacio: require('./assets/rabagu/corazon-1.png'),
  corazonLleno: require('./assets/rabagu/corazon-2.png'),
  sinCheck: require('./assets/rabagu/sincheck.png'),
  check: require('./assets/rabagu/check.png'),
  figuraInicioSesion: require('./assets/rabagu/figura-iniciodesesion.png'),
  mujerHabla: require('./assets/rabagu/mujer-habla.png'),
  rabagu: require('./assets/rabagu/rabagu.png'),
  mujer: require('./assets/rabagu/mujer.png'),
  barraOnboarding: require('./assets/rabagu/barra.png'),
  logo: require('./assets/rabagu/logo.png'),
  logoRabagu: require('./assets/rabagu/logo-rabagu.png'),
  ajustes: require('./assets/rabagu/ajustes.png'),
  perfilActivo: require('./assets/rabagu/perfil-2.png'),
  regresar: require('./assets/rabagu/regresar.png'),
  perfilCliente: require('./assets/rabagu/perfil-cliente.png'),
  perfilEmprendedora: require('./assets/rabagu/perfil-emprendedora.png'),
  ubicacionIcono: require('./assets/rabagu/ubicacionicono.png'),
  patronPerfil: require('./assets/rabagu/patron-perfil.png'),
  misMensajes: require('./assets/rabagu/mis-mensajes.png'),
  meGustas: require('./assets/rabagu/me-gustas.png'),
  productosIcono: require('./assets/rabagu/productos.png'),
};

const categories = [
  {
    name: 'Textiles\ny tejidos',
    image: IMAGES.textiles,
    background: '#F8D8DA',
  },
  {
    name: 'Cerámica',
    image: IMAGES.ceramica,
    background: '#FCEFC9',
  },
  {
    name: 'Plantas',
    image: IMAGES.plantas,
    background: '#DDEDE5',
  },
  {
    name: 'Cuidado\npersonal',
    image: IMAGES.cuidado,
    background: '#DFE8DE',
  },
];

const CATALOG = [
  { name: 'Artesanías', items: ['Muñeca de tusa', 'Jícaro tallado', 'Alebrije', 'Figura decorativa', 'Adorno cultural', 'Recuerdo artesanal'] },
  { name: 'Alimentos', items: ['Mermelada', 'Galletas', 'Pan casero', 'Dulce tradicional', 'Salsa criolla', 'Conserva de frutas'] },
  { name: 'Plantas', items: ['Orquídea', 'Suculenta', 'Helecho', 'Cactus', 'Planta aromática', 'Planta ornamental'] },
  { name: 'Cuidado personal', items: ['Jabón corporal', 'Crema hidratante', 'Bálsamo labial', 'Exfoliante', 'Aceite corporal', 'Champú sólido'] },
  { name: 'Textiles y tejidos', items: ['Mochila tejida', 'Bolso bordado', 'Monedero textil', 'Bufanda tejida', 'Camino de mesa', 'Cojín bordado'] },
  { name: 'Cerámica', items: ['Jarrón de barro', 'Taza de cerámica', 'Plato decorativo', 'Macetera', 'Olla de barro', 'Figura de cerámica'] },
  { name: 'Madera y bambú', items: ['Tabla de madera', 'Caja tallada', 'Cuchara de bambú', 'Lámpara de bambú', 'Portavasos', 'Organizador de madera'] },
  { name: 'Decoración para el hogar', items: ['Centro de mesa', 'Cuadro decorativo', 'Guirnalda', 'Espejo artesanal', 'Portarretrato', 'Adorno de pared'] },
  { name: 'Bebidas artesanales', items: ['Café molido', 'Cacao en polvo', 'Té de hierbas', 'Pinolillo', 'Horchata', 'Infusión frutal'] },
  { name: 'Productos naturales', items: ['Miel natural', 'Aceite de coco', 'Cera vegetal', 'Sales aromáticas', 'Esencia natural', 'Repelente natural'] },
  { name: 'Medicina tradicional', items: ['Ungüento herbal', 'Jarabe de hierbas', 'Pomada natural', 'Mezcla para infusión', 'Aceite medicinal', 'Bálsamo herbal'] },
  { name: 'Semillas y viveros', items: ['Semillas de tomate', 'Semillas de albahaca', 'Árbol frutal', 'Plántula ornamental', 'Kit de cultivo', 'Semillas de flores'] },
] as const;

type Category = (typeof CATALOG)[number]['name'];

type Product = {
  id: number;
  name: string;
  owner: string;
  price: string;
  image: string | null;
  category: Category;
};

const VARIANTS = [
  'Tradicional', 'Artesanal', 'Especial', 'Natural',
] as const;

const ENTREPRENEURS = [
  'Nieves Díaz', 'Cándida Vargas', 'Ana Martínez', 'Juana Pérez',
  'Carmen Gutiérrez', 'Isabel Laguna', 'Luisa Castillo', 'Elena García',
  'Teresa Flores', 'Marta López', 'Lucía Pérez', 'Rosa Hernández',
  'María Gómez', 'Sofía Ruiz', 'Daniela Torres', 'Valeria Mendoza',
  'Gabriela Rivas', 'Andrea Morales', 'Paola Sánchez', 'Camila Ortiz',
  'Josefa Castillo', 'Carolina Vega', 'Patricia Reyes', 'Claudia Silva',
  'Verónica Cruz', 'Adriana Romero', 'Beatriz Herrera', 'Fátima Navarro',
  'Lorena Espinoza', 'Karla Molina', 'Mayra Duarte', 'Silvia Aguilar',
  'Noelia Zamora', 'Irene Pineda', 'Alejandra Solís', 'Natalia Chavarría',
];

const HERO_WIDTH = Dimensions.get('window').width - 36;

const heroSlides = [
  {
    title: 'Apoya lo local,\ntransforma\ncomunidades.',
    description: 'Compra y vende productos\nhechos con identidad.',
    background: '#F8D8DA',
    activeColor: COLORS.pink,
  },
  {
    title: 'Hecho por\nmujeres, hecho\ncon identidad.',
    description: 'Descubre productos\nartesanales y alimenticios.',
    background: '#FCE9B5',
    activeColor: COLORS.yellow,
  },
  {
    title: 'Manos que\ncrean, historias\nque inspiran.',
    description: 'Apoya a emprendedoras que\npreservan nuestra cultura.',
    background: '#CDEBE4',
    activeColor: COLORS.turquoise,
  },
];

const products: Product[] = CATALOG.flatMap((category, categoryIndex) =>
  category.items.flatMap((baseName, baseIndex) =>
    VARIANTS.map((variant, variantIndex) => {
      const itemIndex = baseIndex * VARIANTS.length + variantIndex;
      const price = 80 + ((categoryIndex * 67 + itemIndex * 29) % 721);
      return {
        id: categoryIndex * 24 + itemIndex + 1,
        name: baseName + ' ' + variant,
        owner: ENTREPRENEURS[itemIndex],
        price: 'C$' + price.toFixed(2),
        image: null,
        category: category.name,
      };
    })
  )
);

export default function App() {
  const [onboardingStep, setOnboardingStep] = useState(0);
  useEffect(() => {
  initDB();
}, []);
  const [screen, setScreen] = useState<
    | 'inicio'
    | 'tienda'
    | 'mapa'
    | 'producto'
    | 'emprendedora'
    | 'mensajes'
    | 'miperfil'
  >('inicio');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [slideIndex, setSlideIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (onboardingStep > 1) return;

    const timer = setTimeout(
      () => setOnboardingStep((current) => current + 1),
      onboardingStep === 0 ? 1800 : 2200
    );

    return () => clearTimeout(timer);
  }, [onboardingStep]);

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  };

  const openBusinessMap = () => {
    setScreen('mapa');
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setScreen('producto');
  };

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.owner}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (onboardingStep < 4) {
    return (
      <Onboarding
        step={onboardingStep}
        onContinue={() =>
          setOnboardingStep((current) => Math.min(current + 1, 4))
        }
      />
    );
  }

  return (
    <View style={styles.safeArea}>

      {screen === 'inicio' ? (
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>¡Hola, Nieves!</Text>

        <View style={styles.searchBox}>
          <Image
            source={IMAGES.lupa}
            style={styles.searchIcon}
            resizeMode="contain"
          />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar productos"
            placeholderTextColor="#9B8D9D"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            onMomentumScrollEnd={(event) => {
              const nextIndex = Math.round(
                event.nativeEvent.contentOffset.x / HERO_WIDTH
              );
              setSlideIndex(nextIndex);
            }}
          >
            {heroSlides.map((slide) => (
              <View
                key={slide.title}
                style={[
                  styles.hero,
                  {
                    width: HERO_WIDTH,
                    backgroundColor: slide.background,
                  },
                ]}
              >
                <View style={styles.heroText}>
                  <Text style={styles.heroTitle}>{slide.title}</Text>
                  <Text style={styles.heroDescription}>
                    {slide.description}
                  </Text>
                </View>

                <Image
                  source={IMAGES.figuraInicio}
                  style={styles.heroFigure}
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>

          <View style={styles.carouselDots}>
            {heroSlides.map((slide, index) => (
              <View
                key={slide.title}
                style={[
                  styles.carouselDot,
                  {
                    backgroundColor:
                      slideIndex === index
                        ? slide.activeColor
                        : '#9D8C9F',
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <SectionHeader title="Categorías" />

        <View style={styles.categoryRow}>
          {categories.map((category) => (
            <Pressable
              key={category.name}
              style={[
                styles.category,
                { backgroundColor: category.background },
              ]}
            >
              <Image
                source={category.image}
                style={styles.categoryImage}
                resizeMode="contain"
              />

              <Text style={styles.categoryName}>
                {category.name}
              </Text>
            </Pressable>
          ))}
        </View>

        <SectionHeader title="Productos destacados" />

        <View style={styles.products}>
          {filteredProducts.slice(0, 9).map((product) => (
            <Pressable
              key={product.id}
              style={styles.productCard}
              onPress={() => openProduct(product)}
            >
              {product.image ? (
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
              ) : (
                <View style={styles.productPlaceholder}>
                  <Text style={styles.placeholderIcon}>▧</Text>
                  <Text style={styles.placeholderText}>
                    Agregar foto
                  </Text>
                </View>
              )}

              <Pressable
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(product.id)}
                accessibilityRole="button"
                accessibilityLabel="Agregar o quitar de favoritos"
              >
                <Image
                  source={
                    favorites.includes(product.id)
                      ? IMAGES.corazonLleno
                      : IMAGES.corazonVacio
                  }
                  style={styles.heartImage}
                  resizeMode="contain"
                />
              </Pressable>

              <View style={styles.productInformation}>
                <Text numberOfLines={1} style={styles.productName}>
                  {product.name}
                </Text>

                <Text numberOfLines={1} style={styles.productOwner}>
                  {product.owner}
                </Text>

                <Text style={styles.productPrice}>
                  {product.price}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      ) : screen === 'tienda' ? (
        <ShopScreen
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onSelectProduct={openProduct}
        />
      ) : screen === 'mapa' ? (
        <BusinessMap onBack={() => setScreen('inicio')} />
      ) : screen === 'mensajes' ? (
        <MessagesScreen onBack={() => setScreen('inicio')} />
      ) : screen === 'miperfil' ? (
        <EntrepreneurProfile
          product={
            products.find(
              (item) =>
                item.owner === 'Nieves Díaz' &&
                item.category === 'Textiles y tejidos'
            ) ?? products[0]
          }
          products={products.filter((item) => item.owner === 'Nieves Díaz')}
          favorites={favorites}
          onFavorite={toggleFavorite}
          onSelectProduct={openProduct}
          onBack={() => setScreen('inicio')}
        />
      ) : screen === 'producto' && selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          favorite={favorites.includes(selectedProduct.id)}
          onFavorite={() => toggleFavorite(selectedProduct.id)}
          onBack={() => setScreen('tienda')}
          onOpenEntrepreneur={() => setScreen('emprendedora')}
          onOpenMap={() => setScreen('mapa')}
        />
      ) : selectedProduct ? (
        <EntrepreneurProfile
          product={selectedProduct}
          products={products.filter(
            (item) => item.owner === selectedProduct.owner
          )}
          favorites={favorites}
          onFavorite={toggleFavorite}
          onSelectProduct={openProduct}
          onBack={() => setScreen('producto')}
        />
      ) : (
        <BusinessMap onBack={() => setScreen('inicio')} />
      )}

      <View style={styles.navigation}>
        <View style={styles.navigationRightEdge} />
        <Image
          source={IMAGES.barra}
          style={styles.navigationBackground}
          resizeMode="stretch"
        />
        <NavigationButton
          image={
            screen === 'inicio'
              ? IMAGES.inicio
              : IMAGES.inicioInactivo
          }
          label="Inicio"
          onPress={() => setScreen('inicio')}
        />
        <NavigationButton
          image={
            screen === 'tienda'
              ? IMAGES.tiendaActiva
              : IMAGES.tienda
          }
          label="Tienda"
          onPress={() => setScreen('tienda')}
        />

        <View style={styles.locationSpacer} />

        <Pressable
          style={styles.locationButton}
          onPress={openBusinessMap}
          accessibilityRole="button"
          accessibilityLabel="Abrir el mapa de negocios"
        >
          <Image
            source={IMAGES.ubicacion}
            style={styles.locationImage}
            resizeMode="contain"
          />
        </Pressable>

        <NavigationButton
          image={screen === 'mensajes' ? IMAGES.mensajeActivo : IMAGES.mensaje}
          label="Mensaje"
          onPress={() => setScreen('mensajes')}
        />

        <NavigationButton
          image={
            screen === 'emprendedora' || screen === 'miperfil'
              ? IMAGES.perfilActivo
              : IMAGES.perfil
          }
          label="Perfil"
          onPress={() => setScreen('miperfil')}
        />
      </View>
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.viewAll}>Ver todas</Text>
    </View>
  );
}

function Onboarding({
  step,
  onContinue,
}: {
  step: number;
  onContinue: () => void;
}) {
  const [language, setLanguage] = useState('Español');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (step === 0) {
    return (
      <Pressable style={styles.splashScreen} onPress={onContinue}>
        <Image
          source={IMAGES.logoRabagu}
          style={styles.splashLogo}
          resizeMode="contain"
        />
      </Pressable>
    );
  }

  if (step === 1) {
    return (
      <Pressable style={styles.brandScreen} onPress={onContinue}>
        <Image
          source={IMAGES.rabagu}
          style={styles.brandWordmark}
          resizeMode="contain"
        />
        <Text style={styles.brandPhrase}>
          Aitxé lu rabagu-nu lú{`\n`}nà-ña’jú úmba lú
        </Text>
        <Image
          source={IMAGES.mujer}
          style={styles.brandWoman}
          resizeMode="contain"
        />
      </Pressable>
    );
  }

  if (step === 2) {
    const languages = [
      { name: 'Español', detail: 'Idioma predeterminado' },
      { name: 'Miskito', detail: 'Miskitu' },
      { name: 'Inglés criollo', detail: 'Creole' },
    ];

    return (
      <View style={styles.onboardingScreen}>
        <Image
          source={IMAGES.mujerHabla}
          style={styles.languageWoman}
          resizeMode="contain"
        />
        <Text style={styles.languageQuestion}>
          ¿En qué idioma deseas{`\n`}utilizar Rabagú?
        </Text>

        <View style={styles.languageList}>
          {languages.map((item) => {
            const selected = language === item.name;
            return (
              <Pressable
                key={item.name}
                onPress={() => setLanguage(item.name)}
                style={[
                  styles.languageCard,
                  selected && styles.languageCardSelected,
                ]}
              >
                <View>
                  <Text style={styles.languageName}>{item.name}</Text>
                  <Text style={styles.languageDetail}>{item.detail}</Text>
                </View>
                <Image
                  source={selected ? IMAGES.check : IMAGES.sinCheck}
                  style={styles.languageCheck}
                  resizeMode="contain"
                />
              </Pressable>
            );
          })}
        </View>

        <Pressable style={styles.onboardingButton} onPress={onContinue}>
          <Text style={styles.onboardingButtonText}>Continuar</Text>
        </Pressable>
        <OnboardingDots active={0} />
        <Image
          source={IMAGES.barraOnboarding}
          style={styles.onboardingPattern}
          resizeMode="stretch"
        />
      </View>
    );
  }

  return (
    <View style={styles.onboardingScreen}>
      <Image
        source={IMAGES.figuraInicioSesion}
        style={styles.loginSymbol}
        resizeMode="contain"
      />
      <Text style={styles.welcomeTitle}>¡Bienvenida!</Text>
      <Text style={styles.welcomeSubtitle}>
        Crea una cuenta para continuar
      </Text>

      <View style={styles.loginForm}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#806F82"
          autoCapitalize="none"
          keyboardType="email-address"
          style={[styles.loginInput, styles.loginInputActive]}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          placeholderTextColor="#806F82"
          secureTextEntry
          style={styles.loginInput}
        />
        <Pressable>
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
        <Pressable style={styles.phoneButton}>
          <Text style={styles.phoneButtonText}>
            Continuar con número de teléfono
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.onboardingButton} onPress={onContinue}>
        <Text style={styles.onboardingButtonText}>Continuar</Text>
      </Pressable>
      <OnboardingDots active={1} />
      <Image
        source={IMAGES.barraOnboarding}
        style={styles.onboardingPattern}
        resizeMode="stretch"
      />
    </View>
  );
}

function OnboardingDots({ active }: { active: number }) {
  return (
    <View style={styles.onboardingDots}>
      {[0, 1, 2].map((index) => (
        <View
          key={index}
          style={[
            styles.onboardingDot,
            index === active && styles.onboardingDotActive,
          ]}
        />
      ))}
    </View>
  );
}

const BUSINESS_LOCATIONS = [
  {
    id: 1,
    name: 'Textiles Nieves Díaz',
    description: 'Textiles y tejidos artesanales',
    latitude: 12.1364,
    longitude: -86.2514,
  },
  {
    id: 2,
    name: 'Cerámica Cándida Vargas',
    description: 'Cerámica y artesanías de barro',
    latitude: 12.1268,
    longitude: -86.2665,
  },
  {
    id: 3,
    name: 'Productos Ana Martínez',
    description: 'Alimentos y productos naturales',
    latitude: 12.1472,
    longitude: -86.2731,
  },
  {
    id: 4,
    name: 'Vivero Juana Pérez',
    description: 'Plantas, semillas y vivero',
    latitude: 12.1187,
    longitude: -86.2387,
  },
];

const BUSINESS_PIN_POSITIONS = [
  { top: '30%', left: '14%' },
  { top: '48%', right: '13%' },
  { top: '64%', left: '24%' },
  { top: '72%', right: '28%' },
] as const;

function BusinessMap({ onBack }: { onBack: () => void }) {
  const [mapSearch, setMapSearch] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState(1);

  const visibleLocations = BUSINESS_LOCATIONS.filter((business) =>
    `${business.name} ${business.description}`
      .toLowerCase()
      .includes(mapSearch.toLowerCase())
  );

  return (
    <View style={styles.mapScreen}>
      <View style={styles.mapCanvas}>
        <View style={[styles.mapStreet, styles.mapStreetOne]} />
        <View style={[styles.mapStreet, styles.mapStreetTwo]} />
        <View style={[styles.mapStreet, styles.mapStreetThree]} />
        <View style={[styles.mapStreet, styles.mapStreetFour]} />
        <View style={styles.mapRiver} />
        <View style={[styles.mapPark, styles.mapParkOne]} />
        <View style={[styles.mapPark, styles.mapParkTwo]} />

        {visibleLocations.map((business, index) => (
          <Pressable
            key={business.id}
            onPress={() => setSelectedBusiness(business.id)}
            style={[
              styles.businessPin,
              BUSINESS_PIN_POSITIONS[index % 4],
              selectedBusiness === business.id && styles.businessPinSelected,
            ]}
          >
            <View style={styles.businessPinCircle}>
              <Image
                source={IMAGES.perfilEmprendedora}
                style={styles.businessPinAvatar}
              />
            </View>
            <View style={styles.businessPinPoint} />
          </Pressable>
        ))}
      </View>

      <View style={styles.mapHeader}>
        <Pressable
          style={styles.mapBackButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Regresar al inicio"
        >
          <Text style={styles.mapBackIcon}>‹</Text>
        </Pressable>
        <Text style={styles.mapTitle}>Mapa</Text>
        <View style={styles.mapHeaderSpacer} />
      </View>

      <View style={styles.mapSearchBox}>
        <Image
          source={IMAGES.lupa}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          value={mapSearch}
          onChangeText={setMapSearch}
          placeholder="Buscar negocios"
          placeholderTextColor="#9B8D9D"
          style={styles.searchInput}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.mapBusinessList}
        contentContainerStyle={styles.mapBusinessListContent}
      >
        {visibleLocations.map((business) => (
          <Pressable
            key={business.id}
            onPress={() => setSelectedBusiness(business.id)}
            style={[
              styles.mapBusinessCard,
              selectedBusiness === business.id && styles.mapBusinessCardSelected,
            ]}
          >
            <Image
              source={IMAGES.perfilEmprendedora}
              style={styles.mapBusinessAvatar}
            />
            <View style={styles.mapBusinessText}>
              <Text numberOfLines={1} style={styles.mapBusinessName}>
                {business.name}
              </Text>
              <Text numberOfLines={2} style={styles.mapBusinessDescription}>
                {business.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function entrepreneurRole(category: Category) {
  if (category === 'Textiles y tejidos') return 'Tejedora';
  if (category === 'Cerámica') return 'Ceramista';
  if (category === 'Plantas' || category === 'Semillas y viveros') {
    return 'Viverista';
  }
  if (category === 'Alimentos' || category === 'Bebidas artesanales') {
    return 'Productora artesanal';
  }
  return 'Emprendedora';
}

function MessagesScreen({ onBack }: { onBack: () => void }) {
  const [draft, setDraft] = useState('');
  const [conversation, setConversation] = useState([
    { id: 1, mine: false, text: '¡Hola, Nieves! Me interesa tu producto.' },
    { id: 2, mine: true, text: 'Claro, todavía está disponible.' },
    { id: 3, mine: false, text: '¡Perfecto! ¿Cuándo podría pasar por él?' },
    { id: 4, mine: true, text: 'Mañana desde la mañana puede venir.' },
  ]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    setConversation((current) => [
      ...current,
      { id: Date.now(), mine: true, text },
    ]);
    setDraft('');
  };

  return (
    <View style={styles.messagesScreen}>
      <Image
        source={IMAGES.patronPerfil}
        style={styles.messagesPattern}
        resizeMode="stretch"
      />
      <View style={styles.messagesHeader}>
        <Pressable onPress={onBack} style={styles.detailHeaderButton}>
          <Image source={IMAGES.regresar} style={styles.backImage} />
        </Pressable>
        <Image source={IMAGES.perfilCliente} style={styles.messagesAvatar} />
        <View style={styles.messagesHeaderText}>
          <Text style={styles.messagesName}>Cynthia Laguna</Text>
          <Text style={styles.messagesStatus}>Cliente · León, Nicaragua</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.conversationContent}>
        {conversation.map((item) => (
          <View
            key={item.id}
            style={[
              styles.messageRow,
              item.mine ? styles.messageRowMine : styles.messageRowOther,
            ]}
          >
            {!item.mine && (
              <Image source={IMAGES.perfilCliente} style={styles.chatAvatar} />
            )}
            <View
              style={[
                styles.messageBubble,
                item.mine ? styles.messageBubbleMine : styles.messageBubbleOther,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.messageComposer}>
        <View style={styles.messageInputBox}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="#7E7080"
            style={styles.messageInput}
          />
        </View>
        <Pressable style={styles.sendMessageButton} onPress={sendMessage}>
          <Text style={styles.sendMessageArrow}>›</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ProductDetail({
  product,
  favorite,
  onFavorite,
  onBack,
  onOpenEntrepreneur,
  onOpenMap,
}: {
  product: Product;
  favorite: boolean;
  onFavorite: () => void;
  onBack: () => void;
  onOpenEntrepreneur: () => void;
  onOpenMap: () => void;
}) {
  const [message, setMessage] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.detailContent}>
      <View style={styles.detailHeader}>
        <Pressable onPress={onBack} style={styles.detailHeaderButton}>
          <Image source={IMAGES.regresar} style={styles.backImage} />
        </Pressable>
        <Text style={styles.detailTitle}>Producto</Text>
        <Pressable onPress={onFavorite} style={styles.detailHeaderButton}>
          <Image
            source={favorite ? IMAGES.corazonLleno : IMAGES.corazonVacio}
            style={styles.detailHeart}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {product.image ? (
        <Image source={{ uri: product.image }} style={styles.detailImage} />
      ) : (
        <View style={styles.detailPlaceholder}>
          <Text style={styles.detailPlaceholderIcon}>▧</Text>
          <Text style={styles.detailPlaceholderText}>Agregar foto del producto</Text>
        </View>
      )}

      <View style={styles.detailInformation}>
        <Text style={styles.detailProductName}>{product.name}</Text>
        <Text style={styles.detailPrice}>{product.price}</Text>
        <Text style={styles.detailDescription}>
          Producto artesanal elaborado por manos nicaragüenses. Una pieza
          especial, resistente y hecha con identidad cultural.
        </Text>

        <View style={styles.detailMessageBox}>
          <Image source={IMAGES.misMensajes} style={styles.detailMessageIcon} />
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Enviar mensaje"
            placeholderTextColor="#9B8D9D"
            style={styles.detailMessageInput}
          />
        </View>

        <Pressable
          style={styles.entrepreneurCard}
          onPress={onOpenEntrepreneur}
        >
          <Image
            source={IMAGES.perfilEmprendedora}
            style={styles.entrepreneurAvatar}
          />
          <View style={styles.entrepreneurCardText}>
            <Text style={styles.entrepreneurName}>{product.owner}</Text>
            <Text style={styles.entrepreneurRole}>
              {entrepreneurRole(product.category)}
            </Text>
          </View>
          <Image source={IMAGES.textiles} style={styles.entrepreneurCategoryIcon} />
        </Pressable>

        <Pressable style={styles.productLocationCard} onPress={onOpenMap}>
          <Image source={IMAGES.ubicacionIcono} style={styles.locationOutlineIcon} />
          <View style={styles.locationCardText}>
            <Text style={styles.locationTitle}>León, Nicaragua</Text>
            <Text style={styles.locationDescription}>
              Toca para consultar la ubicación del negocio.
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function EntrepreneurProfile({
  product,
  products: ownerProducts,
  favorites,
  onFavorite,
  onSelectProduct,
  onBack,
}: {
  product: Product;
  products: Product[];
  favorites: number[];
  onFavorite: (id: number) => void;
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.profileContent}>
      <Image
        source={IMAGES.patronPerfil}
        style={styles.profilePattern}
        resizeMode="stretch"
      />
      <View style={styles.profileHeader}>
        <Pressable onPress={onBack} style={styles.detailHeaderButton}>
          <Image source={IMAGES.regresar} style={styles.backImage} />
        </Pressable>
        <Text style={styles.profileTitle}>Mi Perfil</Text>
        <Image source={IMAGES.ajustes} style={styles.settingsIcon} />
      </View>

      <View style={styles.profileAvatarWrap}>
        <Image source={IMAGES.perfilEmprendedora} style={styles.profileAvatar} />
      </View>
      <Text style={styles.profileName}>{product.owner}</Text>
      <Text style={styles.profileRole}>{entrepreneurRole(product.category)}</Text>
      <Text style={styles.profileCity}>León, Nicaragua</Text>

      <Pressable style={styles.addProductButton}>
        <Text style={styles.addProductPlus}>⊕</Text>
        <Text style={styles.addProductText}>Añadir producto</Text>
      </Pressable>

      <View style={styles.profileStats}>
        <ProfileStat image={IMAGES.productosIcono} value="24" label="Productos" />
        <ProfileStat image={IMAGES.meGustas} value="120" label="Me gusta" />
        <ProfileStat image={IMAGES.misMensajes} value="Mis" label="mensajes" />
      </View>

      <View style={styles.aboutCard}>
        <Text style={styles.aboutTitle}>Sobre mí</Text>
        <Text style={styles.aboutText}>
          Creo productos artesanales con técnicas tradicionales que aprendí de
          mi familia. Cada pieza cuenta una historia.
        </Text>
      </View>

      <View style={styles.profileProductsHeader}>
        <Text style={styles.profileProductsTitle}>Mis productos</Text>
        <Text style={styles.viewAll}>Ver todas</Text>
      </View>
      <View style={styles.products}>
        {ownerProducts.slice(0, 3).map((item) => (
          <ShopProductCard
            key={item.id}
            product={item}
            favorite={favorites.includes(item.id)}
            onFavorite={() => onFavorite(item.id)}
            onPress={() => onSelectProduct(item)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function ProfileStat({
  image,
  value,
  label,
}: {
  image: number;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.profileStat}>
      <Image source={image} style={styles.profileStatIcon} resizeMode="contain" />
      <View>
        <Text style={styles.profileStatValue}>{value}</Text>
        <Text style={styles.profileStatLabel}>{label}</Text>
      </View>
    </View>
  );
}

function ShopScreen({
  favorites,
  onToggleFavorite,
  onSelectProduct,
}: {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onSelectProduct: (product: Product) => void;
}) {
  const [shopSearch, setShopSearch] = useState('');
  const [category, setCategory] = useState<'Todos' | Category>('Todos');
  const [visibleCount, setVisibleCount] = useState(24);

  const shopProducts = products.filter((product) => {
    const matchesSearch = `${product.name} ${product.owner}`
      .toLowerCase()
      .includes(shopSearch.toLowerCase());
    const matchesCategory =
      category === 'Todos' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const filters: Array<'Todos' | Category> = [
    'Todos',
    ...CATALOG.map((item) => item.name),
  ];

  const visibleProducts = shopProducts.slice(0, visibleCount);

  return (
    <ScrollView contentContainerStyle={styles.shopContent}>
      <Text style={styles.shopTitle}>Tienda</Text>

      <View style={styles.shopSearchRow}>
        <View style={styles.shopSearchBox}>
          <Image
            source={IMAGES.lupa}
            style={styles.searchIcon}
            resizeMode="contain"
          />
          <TextInput
            value={shopSearch}
            onChangeText={(text) => {
              setShopSearch(text);
              setVisibleCount(24);
            }}
            placeholder="Buscar productos"
            placeholderTextColor="#9B8D9D"
            style={styles.searchInput}
          />
        </View>
        <Text style={styles.shopFavorite}>♥</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {filters.map((filter) => (
          <Pressable
            key={filter}
            onPress={() => {
              setCategory(filter);
              setVisibleCount(24);
            }}
            style={[
              styles.filterChip,
              category === filter && styles.filterChipActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                category === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {shopProducts.length > 0 ? (
        <View style={styles.products}>
          {visibleProducts.map((product) => (
            <ShopProductCard
              key={product.id}
              product={product}
              favorite={favorites.includes(product.id)}
              onFavorite={() => onToggleFavorite(product.id)}
              onPress={() => onSelectProduct(product)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyShop}>
          <Text style={styles.placeholderIcon}>▧</Text>
          <Text style={styles.emptyShopText}>
            No encontramos productos.
          </Text>
        </View>
      )}

      {visibleCount < shopProducts.length && (
        <Pressable
          style={styles.loadMoreButton}
          onPress={() => setVisibleCount((current) => current + 24)}
        >
          <Text style={styles.loadMoreText}>Cargar 24 más</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

function ShopProductCard({
  product,
  favorite,
  onFavorite,
  onPress,
}: {
  product: Product;
  favorite: boolean;
  onFavorite: () => void;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.productCard} onPress={onPress}>
      {product.image ? (
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
        />
      ) : (
        <View style={styles.productPlaceholder}>
          <Text style={styles.placeholderIcon}>▧</Text>
          <Text style={styles.placeholderText}>Agregar foto</Text>
        </View>
      )}

      <Pressable style={styles.favoriteButton} onPress={onFavorite}>
        <Image
          source={
            favorite
              ? IMAGES.corazonLleno
              : IMAGES.corazonVacio
          }
          style={styles.heartImage}
          resizeMode="contain"
        />
      </Pressable>

      <View style={styles.productInformation}>
        <Text numberOfLines={1} style={styles.productName}>
          {product.name}
        </Text>
        <Text numberOfLines={1} style={styles.productOwner}>
          {product.owner}
        </Text>
        <Text style={styles.productPrice}>{product.price}</Text>
      </View>
    </Pressable>
  );
}

function NavigationButton({
  image,
  label,
  onPress,
}: {
  image: number;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.navigationButton} onPress={onPress}>
      <Image
        source={image}
        style={styles.navigationIcon}
        resizeMode="contain"
      />
      <Text style={styles.navigationText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: COLORS.ivory,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 26,
  },
  splashLogo: {
    width: '92%',
    height: '90%',
  },
  brandScreen: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: COLORS.ivory,
    paddingHorizontal: 34,
    paddingTop: 86,
  },
  brandWordmark: {
    width: '84%',
    height: 85,
    alignSelf: 'center',
  },
  brandPhrase: {
    color: COLORS.purple,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '900',
    marginTop: 4,
  },
  brandWoman: {
    position: 'absolute',
    right: -36,
    bottom: -8,
    width: '100%',
    height: '72%',
  },
  onboardingScreen: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: COLORS.ivory,
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 42,
  },
  languageWoman: {
    width: 176,
    height: 170,
  },
  languageQuestion: {
    color: COLORS.purple,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 8,
  },
  languageList: {
    width: '100%',
    marginTop: 32,
    gap: 12,
  },
  languageCard: {
    height: 68,
    paddingLeft: 24,
    paddingRight: 16,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageCardSelected: {
    borderWidth: 2,
    borderColor: COLORS.pink,
  },
  languageName: {
    color: COLORS.purple,
    fontSize: 20,
    fontWeight: '900',
  },
  languageDetail: {
    color: COLORS.purple,
    fontSize: 12,
    marginTop: 1,
  },
  languageCheck: {
    width: 48,
    height: 48,
  },
  onboardingButton: {
    width: 205,
    height: 50,
    borderRadius: 18,
    backgroundColor: COLORS.pink,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 18,
    zIndex: 3,
  },
  onboardingButtonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '900',
  },
  onboardingDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 76,
    zIndex: 3,
  },
  onboardingDot: {
    width: 12,
    height: 12,
    backgroundColor: '#968A99',
  },
  onboardingDotActive: {
    backgroundColor: COLORS.pink,
  },
  onboardingPattern: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 64,
  },
  loginSymbol: {
    width: 112,
    height: 112,
    marginTop: 6,
  },
  welcomeTitle: {
    color: COLORS.pink,
    fontSize: 34,
    fontWeight: '900',
    marginTop: 8,
  },
  welcomeSubtitle: {
    color: COLORS.purple,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 7,
  },
  loginForm: {
    width: '100%',
    marginTop: 70,
    gap: 14,
  },
  loginInput: {
    width: '100%',
    height: 62,
    borderRadius: 20,
    paddingHorizontal: 18,
    color: COLORS.purple,
    backgroundColor: '#F8F9F9',
    fontSize: 14,
  },
  loginInputActive: {
    borderWidth: 2,
    borderColor: COLORS.pink,
  },
  forgotPassword: {
    color: COLORS.pink,
    fontSize: 12,
    textAlign: 'right',
    marginTop: -3,
  },
  phoneButton: {
    height: 52,
    borderRadius: 18,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  phoneButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '900',
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.ivory,
    paddingTop: 28,
  },
  content: {
    padding: 18,
    paddingBottom: 105,
  },
  shopContent: {
    paddingHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 110,
  },
  mapScreen: {
    flex: 1,
    backgroundColor: COLORS.ivory,
  },
  mapCanvas: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: '#F7EBD7',
  },
  mapStreet: {
    position: 'absolute',
    width: 16,
    height: '145%',
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  mapStreetOne: {
    left: '20%',
    top: '-20%',
    transform: [{ rotate: '-24deg' }],
  },
  mapStreetTwo: {
    left: '52%',
    top: '-18%',
    transform: [{ rotate: '18deg' }],
  },
  mapStreetThree: {
    right: '12%',
    top: '-10%',
    transform: [{ rotate: '-17deg' }],
  },
  mapStreetFour: {
    left: '48%',
    top: '6%',
    height: '100%',
    transform: [{ rotate: '72deg' }],
  },
  mapRiver: {
    position: 'absolute',
    left: '-15%',
    top: '45%',
    width: '135%',
    height: 26,
    borderRadius: 14,
    backgroundColor: '#63C9DE',
    transform: [{ rotate: '13deg' }],
  },
  mapPark: {
    position: 'absolute',
    width: 115,
    height: 145,
    borderRadius: 35,
    backgroundColor: '#CFD9B8',
    opacity: 0.85,
  },
  mapParkOne: {
    right: '18%',
    top: '25%',
    transform: [{ rotate: '-16deg' }],
  },
  mapParkTwo: {
    left: '-7%',
    bottom: '4%',
    transform: [{ rotate: '25deg' }],
  },
  businessPin: {
    position: 'absolute',
    width: 68,
    height: 88,
    alignItems: 'center',
    zIndex: 3,
  },
  businessPinSelected: {
    transform: [{ scale: 1.15 }],
  },
  businessPinCircle: {
    width: 62,
    height: 62,
    padding: 5,
    borderRadius: 31,
    backgroundColor: COLORS.pink,
  },
  businessPinAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 26,
  },
  businessPinPoint: {
    width: 0,
    height: 0,
    marginTop: -5,
    borderLeftWidth: 16,
    borderRightWidth: 16,
    borderTopWidth: 25,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.pink,
  },
  mapHeader: {
    marginTop: 18,
    height: 54,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapBackButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapBackIcon: {
    color: COLORS.pink,
    fontSize: 66,
    lineHeight: 58,
    fontWeight: '500',
  },
  mapTitle: {
    color: COLORS.pink,
    fontSize: 30,
    fontWeight: '900',
  },
  mapHeaderSpacer: {
    width: 48,
  },
  mapSearchBox: {
    height: 58,
    marginHorizontal: 18,
    marginTop: 18,
    paddingHorizontal: 17,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#32113C',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  mapBusinessList: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 14,
    maxHeight: 86,
  },
  mapBusinessListContent: {
    paddingHorizontal: 14,
    gap: 10,
  },
  mapBusinessCard: {
    width: 245,
    height: 76,
    borderWidth: 2,
    borderColor: COLORS.pink,
    borderRadius: 18,
    padding: 9,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapBusinessCardSelected: {
    backgroundColor: '#F8D8DA',
    borderWidth: 3,
  },
  mapBusinessAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  mapBusinessText: {
    flex: 1,
    marginLeft: 10,
  },
  mapBusinessName: {
    color: COLORS.purple,
    fontSize: 14,
    fontWeight: '900',
  },
  mapBusinessDescription: {
    color: COLORS.purple,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 3,
  },
  messagesScreen: {
    flex: 1,
    backgroundColor: COLORS.ivory,
  },
  messagesPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 105,
    opacity: 0.12,
  },
  messagesHeader: {
    height: 88,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messagesAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginLeft: 6,
  },
  messagesHeaderText: {
    flex: 1,
    marginLeft: 12,
  },
  messagesName: {
    color: COLORS.purple,
    fontSize: 18,
    fontWeight: '900',
  },
  messagesStatus: {
    color: COLORS.purple,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  conversationContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingVertical: 24,
    gap: 16,
  },
  messageRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageRowMine: {
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    justifyContent: 'flex-start',
  },
  chatAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 9,
  },
  messageBubble: {
    maxWidth: '72%',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  messageBubbleMine: {
    backgroundColor: '#F8D8DA',
  },
  messageBubbleOther: {
    backgroundColor: COLORS.white,
  },
  messageText: {
    color: '#111111',
    fontSize: 14,
    lineHeight: 20,
  },
  messageComposer: {
    height: 72,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  messageInputBox: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: COLORS.pink,
    borderRadius: 19,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  messageInput: {
    color: COLORS.purple,
    fontSize: 14,
  },
  sendMessageButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.pink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendMessageArrow: {
    color: COLORS.white,
    fontSize: 47,
    lineHeight: 45,
    fontWeight: '500',
    marginTop: -5,
  },
  detailContent: {
    paddingBottom: 110,
    backgroundColor: COLORS.ivory,
  },
  detailHeader: {
    height: 72,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailHeaderButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    width: 25,
    height: 32,
    resizeMode: 'contain',
  },
  detailTitle: {
    color: COLORS.pink,
    fontSize: 26,
    fontWeight: '900',
  },
  detailHeart: {
    width: 34,
    height: 34,
  },
  detailImage: {
    width: '100%',
    height: 310,
  },
  detailPlaceholder: {
    width: '100%',
    height: 310,
    backgroundColor: '#E9DED6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailPlaceholderIcon: {
    color: '#B7A9B8',
    fontSize: 70,
  },
  detailPlaceholderText: {
    color: '#8C7E8E',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },
  detailInformation: {
    padding: 22,
  },
  detailProductName: {
    color: COLORS.purple,
    fontSize: 27,
    fontWeight: '900',
  },
  detailPrice: {
    color: COLORS.pink,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 8,
  },
  detailDescription: {
    color: '#111111',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 20,
  },
  detailMessageBox: {
    height: 58,
    marginTop: 30,
    borderWidth: 2,
    borderColor: COLORS.pink,
    borderRadius: 28,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailMessageIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  detailMessageInput: {
    flex: 1,
    color: COLORS.purple,
    fontSize: 15,
    marginLeft: 10,
  },
  entrepreneurCard: {
    minHeight: 92,
    marginTop: 16,
    borderWidth: 2,
    borderColor: COLORS.pink,
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  entrepreneurAvatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  entrepreneurCardText: {
    flex: 1,
    marginLeft: 14,
  },
  entrepreneurName: {
    color: COLORS.purple,
    fontSize: 18,
    fontWeight: '900',
  },
  entrepreneurRole: {
    color: COLORS.purple,
    fontSize: 14,
    marginTop: 5,
  },
  entrepreneurCategoryIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  productLocationCard: {
    minHeight: 105,
    marginTop: 16,
    borderWidth: 2,
    borderColor: COLORS.pink,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationOutlineIcon: {
    width: 42,
    height: 52,
    resizeMode: 'contain',
  },
  locationCardText: {
    flex: 1,
    marginLeft: 14,
  },
  locationTitle: {
    color: COLORS.purple,
    fontSize: 18,
    fontWeight: '900',
  },
  locationDescription: {
    color: COLORS.purple,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
  },
  profileContent: {
    paddingHorizontal: 18,
    paddingBottom: 115,
    backgroundColor: COLORS.ivory,
  },
  profilePattern: {
    position: 'absolute',
    top: 74,
    left: 0,
    width: '115%',
    height: 100,
    opacity: 0.14,
  },
  profileHeader: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileTitle: {
    color: COLORS.pink,
    fontSize: 25,
    fontWeight: '900',
  },
  settingsIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  profileAvatarWrap: {
    width: 125,
    height: 125,
    borderRadius: 63,
    alignSelf: 'center',
    marginTop: 8,
  },
  profileAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 63,
  },
  profileName: {
    color: COLORS.purple,
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 10,
  },
  profileRole: {
    color: COLORS.pink,
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 5,
  },
  profileCity: {
    color: '#111111',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 7,
  },
  addProductButton: {
    height: 55,
    marginTop: 18,
    borderWidth: 2,
    borderColor: COLORS.pink,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addProductPlus: {
    color: COLORS.pink,
    fontSize: 26,
    fontWeight: '900',
    marginRight: 8,
  },
  addProductText: {
    color: '#111111',
    fontSize: 18,
    fontWeight: '900',
  },
  profileStats: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  profileStat: {
    flex: 1,
    minHeight: 64,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileStatIcon: {
    width: 30,
    height: 30,
    marginRight: 7,
  },
  profileStatValue: {
    color: COLORS.purple,
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  profileStatLabel: {
    color: '#111111',
    fontSize: 10,
    textAlign: 'center',
  },
  aboutCard: {
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    padding: 18,
  },
  aboutTitle: {
    color: COLORS.purple,
    fontSize: 18,
    fontWeight: '900',
  },
  aboutText: {
    color: '#111111',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  profileProductsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 12,
  },
  profileProductsTitle: {
    color: COLORS.purple,
    fontSize: 19,
    fontWeight: '900',
  },
  shopTitle: {
    color: COLORS.pink,
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 24,
  },
  shopSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 22,
  },
  shopSearchBox: {
    flex: 1,
    height: 58,
    paddingHorizontal: 17,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopFavorite: {
    color: COLORS.pink,
    fontSize: 42,
    lineHeight: 46,
  },
  filterRow: {
    gap: 8,
    paddingBottom: 24,
  },
  filterChip: {
    minHeight: 43,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: COLORS.pink,
  },
  filterText: {
    color: '#111111',
    fontSize: 15,
    fontWeight: '800',
  },
  filterTextActive: {
    color: COLORS.white,
  },
  emptyShop: {
    minHeight: 230,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyShopText: {
    color: COLORS.purple,
    fontSize: 15,
    marginTop: 8,
  },
  loadMoreButton: {
    alignSelf: 'center',
    marginTop: 22,
    backgroundColor: COLORS.pink,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 24,
  },
  loadMoreText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '900',
  },
  greeting: {
    color: COLORS.purple,
    fontSize: 30,
    fontWeight: '900',
    marginTop: 15,
    marginBottom: 22,
  },
  searchBox: {
    height: 58,
    paddingHorizontal: 17,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  searchInput: {
    flex: 1,
    color: COLORS.purple,
    fontSize: 17,
    marginLeft: 10,
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  hero: {
    height: 190,
    borderRadius: 23,
    padding: 22,
    overflow: 'hidden',
  },
  carouselContainer: {
    width: HERO_WIDTH,
    height: 190,
    marginBottom: 24,
  },
  carouselDots: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7,
  },
  carouselDot: {
    width: 10,
    height: 10,
  },
  heroText: {
    width: '70%',
    zIndex: 2,
  },
  heroTitle: {
    color: COLORS.purple,
    fontSize: 27,
    lineHeight: 29,
    fontWeight: '900',
  },
  heroDescription: {
    color: COLORS.purple,
    fontSize: 15,
    lineHeight: 19,
    marginTop: 9,
  },
  heroFigure: {
    position: 'absolute',
    right: -17,
    bottom: 0,
    width: 148,
    height: 186,
  },
  pattern: {
    position: 'absolute',
    right: -16,
    top: 12,
    width: 130,
    height: 170,
  },
  patternPink: {
    position: 'absolute',
    right: 15,
    top: 0,
    color: COLORS.pink,
    fontSize: 74,
  },
  patternBlue: {
    position: 'absolute',
    right: 24,
    top: 38,
    color: COLORS.turquoise,
    fontSize: 54,
  },
  patternYellow: {
    position: 'absolute',
    left: 0,
    top: 68,
    color: COLORS.yellow,
    fontSize: 59,
  },
  patternOrange: {
    position: 'absolute',
    right: 5,
    top: 91,
    color: COLORS.orange,
    fontSize: 62,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.purple,
    fontSize: 21,
    fontWeight: '900',
  },
  viewAll: {
    color: COLORS.pink,
    fontSize: 16,
    fontWeight: '800',
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 25,
  },
  category: {
    flex: 1,
    height: 112,
    padding: 4,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImage: {
    width: 48,
    height: 53,
  },
  categoryName: {
    color: COLORS.purple,
    fontSize: 11,
    lineHeight: 12,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 6,
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  productCard: {
    width: '31.6%',
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: COLORS.white,
  },
  productImage: {
    width: '100%',
    height: 115,
  },
  productPlaceholder: {
    width: '100%',
    height: 115,
    backgroundColor: '#EDE4DD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#8C7E8E',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 4,
  },
  placeholderIcon: {
    color: '#B7A9B8',
    fontSize: 31,
    lineHeight: 32,
  },
  favoriteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  heartImage: {
    width: 28,
    height: 28,
  },
  favoriteIcon: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: '700',
    lineHeight: 29,
  },
  favoriteIconActive: {
    color: COLORS.pink,
  },
  productInformation: {
    minHeight: 83,
    padding: 8,
  },
  productName: {
    color: '#111111',
    fontSize: 12,
    fontWeight: '900',
  },
  productOwner: {
    color: '#111111',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  productPrice: {
    color: COLORS.pink,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 6,
  },
  navigation: {
    height: 78,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 4,
    overflow: 'visible',
  },
  navigationBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 78,
  },
  navigationRightEdge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 14,
    height: 78,
    backgroundColor: COLORS.pink,
  },
  navigationButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationIcon: {
    width: 29,
    height: 29,
  },
  navigationText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 2,
  },
  locationSpacer: {
    flex: 1,
    height: '100%',
  },
  locationButton: {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    width: 70,
    height: 104,
    transform: [{ translateX: -35 }],
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 10,
  },
  locationImage: {
    width: 58,
    height: 76,
    marginTop: 0,
  },
});