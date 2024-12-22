import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';
import Product from './product.model';
import Category from './category.model';

interface CategoryProductAttributes {
  id: string;
  product_id: string;
  category_id: string;
  created_at?: Date;
  updated_at?: Date;
}

type CategoryProductCreationAttributes = Optional<
  CategoryProductAttributes,
  'id'
>;

class CategoryProduct
  extends Model<CategoryProductAttributes, CategoryProductCreationAttributes>
  implements CategoryProductAttributes
{
  public id!: string;
  public product_id!: string;
  public category_id!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static associate(models: any) {
    CategoryProduct.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
    });
    CategoryProduct.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

CategoryProduct.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    tableName: 'category_product',
    modelName: 'CategoryProduct',
    timestamps: false,
    underscored: true,
  },
);

export default CategoryProduct;
