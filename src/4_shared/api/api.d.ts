/**
 * Типы API для ekapak.ru
 * Сгенерировано из REST API Copy.postman_collection.json
 */

// ============================================================================
// Модели данных
// ============================================================================

/** Категория товаров */
interface Category {
  /** Уникальный идентификатор категории */
  uuid: string;
  /** Название категории */
  name: string;
  /** Слаг для URL */
  slug: string;
  /** Описание категории (может быть null или JSON) */
  description: string | null;
  /** Дата создания */
  created_at: string;
  /** Дата обновления */
  updated_at: string;
  /** Родительские категории */
  parents?: Category[];
  /** Дочерние категории (рекурсивно вложенные) */
  children?: Category[];
}

/** Торговое предложение (вариант покупки товара) */
interface Offer {
  /** Уникальный идентификатор оффера */
  uuid: string;
  /** Внешний ID (например, из 1С) */
  external_id: string;
  /** Название предложения */
  name: string;
  /** Полное название единицы измерения (Штука, Метр, Килограмм) */
  base_unit_name_full: string;
  /** Международное сокращение единицы (pc., m, kg) */
  base_unit_international_abbr: string;
  /** Артикул предложения */
  article: string;
  /** Штрихкод */
  barcode: string;
  /** Тип цены (Розничная, Оптовая, Акция) */
  price_type_name: string;
  /** Значение цены */
  price_value: number;
  /** Валюта */
  price_currency: string;
  /** Текст для отображения цены */
  price_display_text?: string;
  /** Доступное количество */
  quantity: number;
}

/** Товар */
interface Product {
  /** Уникальный идентификатор товара */
  uuid: string;
  /** Внешний ID (например, из 1С) */
  external_id: string;
  /** Название товара */
  name: string;
  /** Артикул товара */
  sku: string;
  /** Описание товара */
  description: string;
  /** Слаг для URL */
  slug: string;
  /** Толщина */
  thickness?: number;
  /** Ширина */
  width?: number;
  /** Высота */
  height?: number;
  /** Объём */
  volume?: number;
  /** Вес */
  weight?: number;
  /** Ссылка на изображение */
  image: string | null;
  /** UUID категории товара */
  category_uuid: string;
  /** Торговые предложения */
  offers: Offer[];
  /** Дата создания */
  created_at: string;
  /** Дата обновления */
  updated_at: string;
}

// ============================================================================
// Paths (формат openapi-fetch)
// ============================================================================

export interface paths {
  /** Получить все категории */
  '/api/categories': {
    get: {
      responses: {
        200: {
          content: {
            'application/json': Category[];
          };
        };
      };
    };
  };

  /** Получить категорию по uuid или slug */
  '/api/categories/{id}': {
    get: {
      parameters: {
        path: {
          /** UUID или slug категории */
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            'application/json': Category;
          };
        };
      };
    };
  };

  /** Получить все товары (с опциональной фильтрацией по категории) */
  '/api/products': {
    get: {
      parameters?: {
        query?: {
          /** UUID категории для фильтрации */
          category?: string;
        };
      };
      responses: {
        200: {
          content: {
            'application/json': Product[];
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
            'application/json': Product;
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
            'application/json': Product;
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
