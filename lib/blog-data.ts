export interface BlogPost {
  slug: string
  title: {
    es: string
    en: string
  }
  excerpt: {
    es: string
    en: string
  }
  content: {
    es: string
    en: string
  }
  image: string
  date: string
  author: {
    name: string
    role: {
      es: string
      en: string
    }
  }
}

export const blogPosts: BlogPost[] = [
  {
    slug: "tokenizacion-real-estate",
    title: {
      es: "Cómo la tokenización está transformando el real estate",
      en: "How tokenization is transforming real estate",
    },
    excerpt: {
      es: "Descubre cómo la tokenización está revolucionando la inversión inmobiliaria, permitiendo acceso global y fraccionamiento de activos.",
      en: "Discover how tokenization is revolutionizing real estate investment, enabling global access and asset fractionalization.",
    },
    content: {
      es: `La tokenización está revolucionando la industria del real estate de maneras que antes eran impensables. Este proceso permite convertir propiedades físicas en activos digitales, democratizando el acceso a inversiones inmobiliarias que tradicionalmente requerían grandes capitales.

## ¿Qué es la tokenización inmobiliaria?

La tokenización inmobiliaria es el proceso de representar la propiedad de un bien raíz mediante tokens digitales en una blockchain. Cada token representa una fracción del valor total de la propiedad, permitiendo que múltiples inversores puedan participar en la propiedad de un activo inmobiliario.

## Beneficios principales

### 1. Accesibilidad
Ya no necesitas millones para invertir en propiedades premium. Con la tokenización, puedes invertir desde montos mucho más accesibles.

### 2. Liquidez
Los tokens pueden ser comprados y vendidos en mercados secundarios, proporcionando liquidez a un activo tradicionalmente ilíquido.

### 3. Transparencia
Todas las transacciones quedan registradas en la blockchain, garantizando transparencia total y trazabilidad.

### 4. Alcance global
Inversores de cualquier parte del mundo pueden participar, eliminando barreras geográficas.

## El futuro del real estate

La tokenización no es solo una tendencia, es el futuro de la inversión inmobiliaria. Empresas líderes ya están adoptando esta tecnología para ofrecer nuevas oportunidades a inversores de todo el mundo.

En Blockenfy, ayudamos a empresas inmobiliarias a tokenizar sus activos de forma segura y regulada, abriendo nuevas posibilidades de financiamiento y democratizando el acceso a inversiones de calidad.`,
      en: `Tokenization is revolutionizing the real estate industry in ways that were previously unthinkable. This process allows physical properties to be converted into digital assets, democratizing access to real estate investments that traditionally required large capital.

## What is real estate tokenization?

Real estate tokenization is the process of representing property ownership through digital tokens on a blockchain. Each token represents a fraction of the total property value, allowing multiple investors to participate in owning a real estate asset.

## Main benefits

### 1. Accessibility
You no longer need millions to invest in premium properties. With tokenization, you can invest from much more accessible amounts.

### 2. Liquidity
Tokens can be bought and sold on secondary markets, providing liquidity to a traditionally illiquid asset.

### 3. Transparency
All transactions are recorded on the blockchain, guaranteeing total transparency and traceability.

### 4. Global reach
Investors from anywhere in the world can participate, eliminating geographical barriers.

## The future of real estate

Tokenization is not just a trend, it's the future of real estate investment. Leading companies are already adopting this technology to offer new opportunities to investors worldwide.

At Blockenfy, we help real estate companies tokenize their assets securely and in a regulated manner, opening new financing possibilities and democratizing access to quality investments.`,
    },
    image: "/modern-real-estate-building-with-blockchain-overla.jpg",
    date: "2025-01-15",
    author: {
      name: "Joaquin Linares",
      role: {
        es: "CEO & Fundador",
        en: "CEO & Founder",
      },
    },
  },
  {
    slug: "smart-contracts-negocios",
    title: {
      es: "Qué es un smart contract y cómo cambia los negocios",
      en: "What is a smart contract and how it changes business",
    },
    excerpt: {
      es: "Los smart contracts están automatizando procesos empresariales, eliminando intermediarios y reduciendo costos operativos significativamente.",
      en: "Smart contracts are automating business processes, eliminating intermediaries and significantly reducing operational costs.",
    },
    content: {
      es: `Los smart contracts o contratos inteligentes están transformando la forma en que las empresas operan, automatizando procesos y eliminando la necesidad de intermediarios costosos.

## ¿Qué es un smart contract?

Un smart contract es un programa informático que se ejecuta automáticamente cuando se cumplen ciertas condiciones predefinidas. Estos contratos están almacenados en una blockchain, lo que garantiza su inmutabilidad y transparencia.

## Ventajas para los negocios

### Automatización total
Los smart contracts ejecutan acciones automáticamente sin intervención humana, reduciendo errores y acelerando procesos.

### Reducción de costos
Al eliminar intermediarios y automatizar procesos, las empresas pueden reducir significativamente sus costos operativos.

### Seguridad mejorada
La tecnología blockchain garantiza que los contratos no puedan ser alterados una vez desplegados, proporcionando seguridad sin precedentes.

### Transparencia
Todas las partes pueden verificar las condiciones y ejecución del contrato, eliminando disputas y malentendidos.

## Casos de uso reales

Los smart contracts ya están siendo utilizados en:
- Tokenización de activos
- Pagos automáticos y distribución de dividendos
- Gestión de cadenas de suministro
- Seguros automatizados
- Votaciones corporativas

## El futuro es ahora

Las empresas que adoptan smart contracts están obteniendo ventajas competitivas significativas. En Blockenfy, desarrollamos smart contracts personalizados para proyectos de tokenización, garantizando seguridad, eficiencia y cumplimiento regulatorio.`,
      en: `Smart contracts are transforming the way businesses operate, automating processes and eliminating the need for costly intermediaries.

## What is a smart contract?

A smart contract is a computer program that executes automatically when certain predefined conditions are met. These contracts are stored on a blockchain, which guarantees their immutability and transparency.

## Business advantages

### Total automation
Smart contracts execute actions automatically without human intervention, reducing errors and accelerating processes.

### Cost reduction
By eliminating intermediaries and automating processes, companies can significantly reduce their operational costs.

### Enhanced security
Blockchain technology ensures that contracts cannot be altered once deployed, providing unprecedented security.

### Transparency
All parties can verify the conditions and execution of the contract, eliminating disputes and misunderstandings.

## Real use cases

Smart contracts are already being used in:
- Asset tokenization
- Automatic payments and dividend distribution
- Supply chain management
- Automated insurance
- Corporate voting

## The future is now

Companies adopting smart contracts are gaining significant competitive advantages. At Blockenfy, we develop custom smart contracts for tokenization projects, guaranteeing security, efficiency and regulatory compliance.`,
    },
    image: "/digital-smart-contract-code-with-blockchain-networ.jpg",
    date: "2025-01-10",
    author: {
      name: "Juan Lazarte",
      role: {
        es: "CTO",
        en: "CTO",
      },
    },
  },
  {
    slug: "tendencias-blockchain-2025",
    title: {
      es: "Las 5 tendencias blockchain que dominarán 2025",
      en: "The 5 blockchain trends that will dominate 2025",
    },
    excerpt: {
      es: "Explora las tendencias más importantes de blockchain para 2025: desde DeFi institucional hasta tokenización masiva de activos reales.",
      en: "Explore the most important blockchain trends for 2025: from institutional DeFi to massive tokenization of real assets.",
    },
    content: {
      es: `El 2025 promete ser un año revolucionario para la tecnología blockchain. Estas son las cinco tendencias que marcarán el futuro de la industria.

## 1. Tokenización masiva de activos reales

La tokenización dejará de ser una novedad para convertirse en el estándar. Veremos más propiedades, empresas y activos tradicionales siendo tokenizados para acceder a mercados globales.

### Por qué importa
- Mayor liquidez para activos tradicionalmente ilíquidos
- Acceso democratizado a inversiones de calidad
- Reducción de barreras de entrada para inversores

## 2. DeFi institucional

Las instituciones financieras tradicionales están adoptando DeFi (Finanzas Descentralizadas) de manera masiva, creando productos híbridos que combinan lo mejor de ambos mundos.

### Impacto esperado
- Mayor legitimidad y adopción mainstream
- Productos financieros más eficientes
- Regulación más clara y favorable

## 3. Interoperabilidad entre blockchains

Las soluciones de interoperabilidad permitirán que diferentes blockchains se comuniquen entre sí, creando un ecosistema más conectado y eficiente.

### Beneficios clave
- Transferencia fluida de activos entre cadenas
- Mayor eficiencia operativa
- Reducción de costos de transacción

## 4. Identidad digital descentralizada

Los sistemas de identidad basados en blockchain permitirán a los usuarios controlar sus datos personales de manera segura y privada.

### Aplicaciones prácticas
- KYC/AML más eficiente
- Reducción de fraude
- Mayor privacidad para usuarios

## 5. Sostenibilidad y blockchain verde

Las soluciones blockchain sostenibles ganarán protagonismo, con más proyectos adoptando mecanismos de consenso eficientes energéticamente.

### Iniciativas destacadas
- Proof of Stake generalizado
- Compensación de carbono tokenizada
- Trazabilidad de cadenas de suministro sostenibles

## Conclusión

Estas tendencias no son futuristas, están sucediendo ahora. En Blockenfy, estamos a la vanguardia de estas innovaciones, ayudando a empresas a aprovechar estas tecnologías para transformar sus negocios.`,
      en: `2025 promises to be a revolutionary year for blockchain technology. These are the five trends that will shape the future of the industry.

## 1. Massive tokenization of real assets

Tokenization will stop being a novelty to become the standard. We will see more properties, companies and traditional assets being tokenized to access global markets.

### Why it matters
- Greater liquidity for traditionally illiquid assets
- Democratized access to quality investments
- Reduced entry barriers for investors

## 2. Institutional DeFi

Traditional financial institutions are massively adopting DeFi (Decentralized Finance), creating hybrid products that combine the best of both worlds.

### Expected impact
- Greater legitimacy and mainstream adoption
- More efficient financial products
- Clearer and more favorable regulation

## 3. Blockchain interoperability

Interoperability solutions will allow different blockchains to communicate with each other, creating a more connected and efficient ecosystem.

### Key benefits
- Smooth asset transfer between chains
- Greater operational efficiency
- Reduced transaction costs

## 4. Decentralized digital identity

Blockchain-based identity systems will allow users to control their personal data securely and privately.

### Practical applications
- More efficient KYC/AML
- Fraud reduction
- Greater privacy for users

## 5. Sustainability and green blockchain

Sustainable blockchain solutions will gain prominence, with more projects adopting energy-efficient consensus mechanisms.

### Featured initiatives
- Generalized Proof of Stake
- Tokenized carbon offsetting
- Sustainable supply chain traceability

## Conclusion

These trends are not futuristic, they are happening now. At Blockenfy, we are at the forefront of these innovations, helping companies leverage these technologies to transform their businesses.`,
    },
    image: "/futuristic-blockchain-network-with-glowing-nodes.jpg",
    date: "2025-01-05",
    author: {
      name: "Matias Acevedo",
      role: {
        es: "CMO",
        en: "CMO",
      },
    },
  },
  {
    slug: "tokenizacion-vehiculos",
    title: {
      es: "Tokenización de vehículos: La nueva frontera de inversión",
      en: "Vehicle tokenization: The new investment frontier",
    },
    excerpt: {
      es: "Descubre cómo la tokenización está abriendo nuevas oportunidades de inversión en el sector automotriz y de transporte.",
      en: "Discover how tokenization is opening new investment opportunities in the automotive and transportation sector.",
    },
    content: {
      es: `La tokenización de vehículos está emergiendo como una oportunidad de inversión innovadora, permitiendo a inversores participar en la propiedad de flotas comerciales, vehículos de lujo y más.

## ¿Por qué tokenizar vehículos?

Los vehículos, especialmente flotas comerciales y vehículos de alto valor, representan activos significativos que pueden generar ingresos constantes. La tokenización permite:

### Acceso a inversiones premium
Inversores pueden participar en la propiedad de vehículos de lujo o flotas comerciales sin necesidad de comprar el activo completo.

### Generación de ingresos pasivos
Los tokens pueden representar derechos sobre los ingresos generados por el vehículo (alquiler, servicios de transporte, etc.).

### Diversificación de portafolio
Agrega una nueva clase de activo a tu portafolio de inversiones.

## Casos de uso

### Flotas comerciales
Empresas de transporte pueden tokenizar sus flotas para obtener financiamiento sin recurrir a préstamos tradicionales.

### Vehículos de lujo
Coleccionistas pueden fraccionar la propiedad de vehículos clásicos o de alta gama, permitiendo a más personas invertir en estos activos.

### Vehículos eléctricos
La tokenización puede facilitar la adopción de vehículos eléctricos al permitir modelos de propiedad compartida.

## El futuro de la movilidad

La tokenización de vehículos no es solo sobre inversión, es sobre reimaginar la propiedad y el acceso a la movilidad. En Blockenfy, estamos ayudando a empresas del sector automotriz a explorar estas nuevas posibilidades.`,
      en: `Vehicle tokenization is emerging as an innovative investment opportunity, allowing investors to participate in the ownership of commercial fleets, luxury vehicles and more.

## Why tokenize vehicles?

Vehicles, especially commercial fleets and high-value vehicles, represent significant assets that can generate consistent income. Tokenization allows:

### Access to premium investments
Investors can participate in the ownership of luxury vehicles or commercial fleets without needing to buy the entire asset.

### Passive income generation
Tokens can represent rights to income generated by the vehicle (rental, transportation services, etc.).

### Portfolio diversification
Add a new asset class to your investment portfolio.

## Use cases

### Commercial fleets
Transportation companies can tokenize their fleets to obtain financing without resorting to traditional loans.

### Luxury vehicles
Collectors can fractionate ownership of classic or high-end vehicles, allowing more people to invest in these assets.

### Electric vehicles
Tokenization can facilitate the adoption of electric vehicles by enabling shared ownership models.

## The future of mobility

Vehicle tokenization is not just about investment, it's about reimagining ownership and access to mobility. At Blockenfy, we are helping automotive sector companies explore these new possibilities.`,
    },
    image: "/luxury-car-with-digital-blockchain-overlay.jpg",
    date: "2024-12-28",
    author: {
      name: "Joaquin Linares",
      role: {
        es: "CEO & Fundador",
        en: "CEO & Founder",
      },
    },
  },
]
