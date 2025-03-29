import { LucidRow, ModelPaginatorContract } from "@adonisjs/lucid/types/model"
import { Pagination } from "../../types/pagination.js"
import IEntity from "./IEntity.js"

/**
 * Interface das entidades pertencentes a um usuário
 * @template EntityModel Propriedades necessárias para lidar com a operação referente a entidade
 * @template CreateEntity Propriedades necessárias para a criação da entidade
 * @template UpdateEntity Propriedades necessárias para a atualização da entidade
*/
export default interface IUserEntity<EntityModel extends LucidRow, CreateEntity, UpdateEntity>
    extends IEntity<EntityModel, CreateEntity, UpdateEntity> {
    ListByUser(pagination : Pagination) : Promise<ModelPaginatorContract<EntityModel>>
}