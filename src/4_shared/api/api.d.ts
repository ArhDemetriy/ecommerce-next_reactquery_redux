// Типы API для ekapak.ru на основе анализа реальных ответов API

// ============================================================================
// Общие типы ответов API
// ============================================================================

/** Базовые метаданные (общие для всех списков) */
interface ApiMetaBase {
  /** Общее количество записей */
  total: number;
  /** Время кеширования ответа */
  cached_at: string;
}

/** Метаданные для /api/categories (без пагинации) */
type CategoriesApiMeta = ApiMetaBase;

/** Метаданные для /api/products (с пагинацией) */
interface ProductsApiMeta extends ApiMetaBase {
  /** Текущая страница */
  current_page: number;
  /** Последняя страница */
  last_page: number;
  /** Записей на странице */
  per_page: number;
}

// ============================================================================
// Блоки описания категорий (CMS-контент)
// ============================================================================

/** Текстовая секция с заголовком и HTML-контентом */
interface TextSectionBlock {
  type: 'text_section';
  data: {
    /** Заголовок секции (может содержать HTML) */
    heading: string;
    /** HTML-контент */
    content: string;
  };
}

/** Простой текстовый блок */
interface SimpleTextBlock {
  type: 'simple_text';
  data: {
    /** HTML-контент */
    text_content: string;
  };
}

/** Список фич/преимуществ */
interface FeaturesListBlock {
  type: 'features_list';
  data: {
    /** Заголовок списка */
    heading: string;
    /** Элементы списка */
    items: { text: string }[];
  };
}

/** Текст с изображением */
interface TextWithImageBlock {
  type: 'text_with_image';
  data: {
    /** Заголовок */
    heading: string;
    /** HTML-контент */
    text: string;
    /** Имя файла изображения (без полного URL) */
    image: string;
    /** Позиция изображения: 'left' | 'right' */
    image_position: string;
  };
}

/** Информационный/предупреждающий блок */
interface NotificationBlock {
  type: 'notification_block';
  data: {
    /** Тип уведомления: 'info', 'warning' и т.д. */
    type: string;
    /** HTML-сообщение */
    message: string;
  };
}

/** Сетка преимуществ */
interface AdvantagesGridBlock {
  type: 'advantages_grid';
  data: {
    /** Заголовок секции (может содержать HTML) */
    heading: string;
    /** Список преимуществ */
    advantages: {
      /** Заголовок преимущества (может содержать HTML) */
      title: string;
      /** Описание преимущества */
      description: string;
    }[];
  };
}

/** Call-to-action блок */
interface CtaBlock {
  type: 'cta_block';
  data: {
    /** Заголовок (может содержать HTML) */
    title: string;
    /** Цвет фона (HEX) */
    bg_color: string;
    /** Ссылка кнопки */
    button_link: string | null;
    /** Текст кнопки */
    button_text: string;
    /** Описание */
    description: string;
  };
}

/** Объединённый тип всех блоков описания */
type DescriptionBlock =
  | TextSectionBlock
  | SimpleTextBlock
  | FeaturesListBlock
  | TextWithImageBlock
  | NotificationBlock
  | AdvantagesGridBlock
  | CtaBlock;

// ============================================================================
// Модели данных
// ============================================================================

/** Изображение товара */
interface ProductImage {
  /** Оригинальный URL изображения */
  original_url: string;
  /** URL превью 500x500 в формате webp */
  card_url: string;
}

/** Торговое предложение (вариант покупки товара) */
interface Offer {
  /** UUID оффера (совпадает с external_id товара) */
  uuid: string;
  /** Цена (строка с десятичной точкой, например "1266.84") */
  price: string;
  /** Валюта: "RUB" */
  currency: string;
  /** Единица измерения: "шт." */
  unit: string;
  /** Количество на складе */
  quantity: number;
}

/** Краткая информация о товаре (в списке товаров категории) */
interface ProductSummary {
  /** UUID товара */
  uuid: string;
  /** Название товара */
  name: string;
  /** Описание товара (plain text) */
  description: string;
  /** Слаг для URL */
  slug: string;
  /** Артикул товара */
  article: string;
  /** UUID категории */
  category_uuid: string;
}

/** Полная информация о категории (в ответе /api/categories/{id}) */
interface CategoryFull {
  /** UUID категории */
  uuid: string;
  /** Название категории */
  name: string;
  /** Слаг для URL */
  slug: string;
  /** Описание категории (массив CMS-блоков) */
  description: DescriptionBlock[];
  /** SEO-заголовок страницы */
  seo_title: string;
  /** SEO-описание для meta */
  seo_description: string;
  /** URL изображения категории или null */
  image: string | null;
  /** Внешний ID (из 1С) */
  external_id: string;
  /** Является ли главной категорией */
  is_main: boolean;
  /** Порядок сортировки */
  sort_order: number;
  /** Порядок отображения свойств (массив UUID) */
  property_order: string[];
  /** Дата удаления (soft delete) */
  deleted_at: string | null;
  /** Дата создания */
  created_at: string;
  /** Дата обновления */
  updated_at: string;
}

/** Категория товаров (в списке /api/categories) */
interface Category {
  /** UUID категории */
  uuid: string;
  /** Название категории */
  name: string;
  /** Слаг для URL */
  slug: string;
  /** Описание категории (массив CMS-блоков) */
  description: DescriptionBlock[];
  /** SEO-заголовок страницы */
  seo_title: string;
  /** SEO-описание для meta */
  seo_description: string;
  /** Полный URL изображения категории (webp, 500x500) */
  image_url: string;
  /** Минимальная цена товаров в категории (строка) */
  min_price: string;
  /** Дочерние категории (только в списке) */
  children?: Category[];
}

/** Детальная категория (ответ /api/categories/{id}) */
interface CategoryDetail {
  /** UUID категории */
  uuid: string;
  /** Название категории */
  name: string;
  /** Слаг для URL */
  slug: string;
  /** Описание категории (массив CMS-блоков) */
  description: DescriptionBlock[];
  /** SEO-заголовок страницы */
  seo_title: string;
  /** SEO-описание для meta */
  seo_description: string;
  /** Полный URL изображения категории (webp, 500x500) */
  image_url: string;
  /** Минимальная цена товаров в категории (строка) */
  min_price: string;
  /** Товары в этой категории (краткая информация) */
  products: ProductSummary[];
  /** Родительские категории или null */
  parents: Category[] | null;
  /** Дочерние категории или null */
  children: Category[] | null;
}

/** Товар в списке (/api/products) */
interface ProductListItem {
  /** UUID товара */
  uuid: string;
  /** Название товара */
  name: string;
  /** Описание товара (plain text) */
  description: string;
  /** Слаг для URL */
  slug: string;
  /** UUID категории */
  category_uuid: string;
  /** Минимальная цена среди офферов (строка) */
  offers_min_price: string;
  /** Торговые предложения */
  offers: Offer[];
  /** SEO-описание */
  seo_description: string;
  /** Минимальная покупка в штуках */
  'Мин. покупка, шт.': string;
  /** Наличие на складе: "Да в наличии" | "Нет под заказ" */
  Наличие: string;
  /** Артикул товара */
  article: string;
  /** Изображения товара */
  images: ProductImage[];
  /** Динамические свойства (характеристики) */
  properties: Record<string, string>;
}

/** Детальная информация о товаре (/api/products/{uuid} или /api/products/slug/{slug}) */
interface Product {
  /** UUID товара */
  uuid: string;
  /** Название товара */
  name: string;
  /** Описание товара (plain text) */
  description: string;
  /** Слаг для URL */
  slug: string;
  /** Название единицы измерения: "Штука" */
  unit_name: string;
  /** Код единицы измерения: "796" */
  unit_code: string;
  /** ISO-код единицы: "PCE" */
  unit_iso: string;
  /** UUID категории */
  category_uuid: string;
  /** Ставка НДС в процентах */
  vat_rate: number;
  /** Тип НДС: "НДС" */
  vat_type: string;
  /** Флаг "Новинка" (0 | 1) */
  is_new: number;
  /** Флаг "Набор" (0 | 1) */
  is_set: number;
  /** Флаг фиксированной цены (0 | 1) */
  fixed_price: number;
  /** Внешний ID (из 1С) */
  external_id: string;
  /** Торговые предложения */
  offers: Offer[];
  /** Полная информация о категории */
  category: CategoryFull;
  /** SEO-описание */
  seo_description: string;
  /** Минимальная покупка в штуках */
  'Мин. покупка, шт.': string;
  /** Наличие на складе */
  Наличие: string;
  /** Артикул товара */
  article: string;
  /** Изображения товара */
  images: ProductImage[];
  /** Динамические свойства (характеристики товара) */
  properties: Record<string, string>;
}

// ============================================================================
// Paths (формат openapi-fetch)
// ============================================================================

export interface paths {
  /** Получить все категории (без пагинации, возвращает все сразу) */
  '/api/categories': {
    get: {
      responses: {
        200: {
          content: {
            'application/json': { data: Category[]; meta: CategoriesApiMeta };
          };
        };
      };
    };
  };

  /** Получить категорию по uuid или slug */
  '/api/categories/{idOrSlug}': {
    get: {
      parameters: {
        path: {
          /** UUID или slug категории */
          idOrSlug: string;
        };
      };
      responses: {
        200: {
          content: {
            'application/json': { data: CategoryDetail };
          };
        };
      };
    };
  };

  /** Получить все товары (с пагинацией и опциональной фильтрацией по категории) */
  '/api/products': {
    get: {
      parameters?: {
        query?: {
          /** UUID категории для фильтрации */
          category?: string;
          /** Номер страницы (по умолчанию 1) */
          page?: number;
          /** Количество товаров на странице (по умолчанию 16) */
          per_page?: number;
        };
      };
      responses: {
        200: {
          content: {
            'application/json': { data: ProductListItem[]; meta: ProductsApiMeta };
          };
        };
      };
    };
  };

  /** Получить товар по uuid */
  '/api/products/{uuid}': {
    get: {
      parameters: {
        path: {
          /** UUID товара */
          uuid: string;
        };
      };
      responses: {
        200: {
          content: {
            'application/json': { data: Product };
          };
        };
      };
    };
  };

  /** Получить товар по slug */
  '/api/products/slug/{slug}': {
    get: {
      parameters: {
        path: {
          /** Slug товара */
          slug: string;
        };
      };
      responses: {
        200: {
          content: {
            'application/json': { data: Product };
          };
        };
      };
    };
  };
}

// ============================================================================
// Вспомогательные типы
// ============================================================================

/** Извлечение типа ответа по пути и методу */
export type ApiResponse<
  Path extends keyof paths,
  Method extends keyof paths[Path] = 'get',
> = paths[Path][Method] extends {
  responses: { 200: { content: { 'application/json': infer R } } };
}
  ? R
  : never;

/** Извлечение path-параметров */
export type PathParams<
  Path extends keyof paths,
  Method extends keyof paths[Path] = 'get',
> = paths[Path][Method] extends { parameters: { path: infer P } } ? P : never;

/** Извлечение query-параметров */
export type QueryParams<
  Path extends keyof paths,
  Method extends keyof paths[Path] = 'get',
> = paths[Path][Method] extends { parameters?: { query?: infer Q } } ? Q : never;
