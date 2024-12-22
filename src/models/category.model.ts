import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';
import Product from './product.model';

interface CategoryAttributes {
  id: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

type CategoryCreationAttributes = Optional<CategoryAttributes, 'id'>;

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: string;
  public name!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public products?: Product[];

  public static async createCategory(
    data: CategoryCreationAttributes,
  ): Promise<Category> {
    return await Category.create(data);
  }

  public static async getAllCategories(): Promise<Category[]> {
    return await Category.findAll();
  }

  public static async getCategoryById(id: string): Promise<Category | null> {
    return await Category.findByPk(id);
  }

  public static async updateCategory(
    id: string,
    data: Partial<CategoryAttributes>,
  ): Promise<[number]> {
    return await Category.update(data, {
      where: { id },
    });
  }

  public static async deleteCategory(id: string): Promise<number> {
    return await Category.destroy({
      where: { id },
    });
  }

  public static associate(models: any) {
    Category.belongsToMany(models.Product, {
      through: 'CategoryProduct',
      foreignKey: 'category_id',
      otherKey: 'product_id',
    });
  }
}

Category.init(
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
    tableName: 'categories',
    timestamps: false,
    underscored: true,
  },
);

Category.associate({ Product });

export default Category;
