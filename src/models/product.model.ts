import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';
import Category from './category.model'; // Import the Category model

interface ProductAttributes {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id'>;

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: string;
  public name!: string;
  public description?: string;
  public price!: number;
  public quantity!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public categories?: Category[];

  public static async createProduct(
    data: ProductCreationAttributes,
  ): Promise<Product> {
    return await Product.create(data);
  }

  public static async getProductById(id: string): Promise<Product | null> {
    return await Product.findByPk(id);
  }

  public static async getAllProducts(): Promise<Product[]> {
    return await Product.findAll();
  }

  public static async updateProduct(
    id: string,
    data: Partial<ProductAttributes>,
  ): Promise<[number]> {
    return await Product.update(data, {
      where: { id },
    });
  }

  public static async deleteProduct(id: string): Promise<number> {
    return await Product.destroy({
      where: { id },
    });
  }

  public static associate(models: any) {
    Product.belongsToMany(models.Category, {
      through: 'CategoryProduct',
      foreignKey: 'product_id',
      otherKey: 'category_id',
    });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: false,
    underscored: true,
  },
);

Product.associate({ Category });

export default Product;
