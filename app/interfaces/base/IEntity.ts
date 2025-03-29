import { LucidRow, ModelPaginatorContract } from "@adonisjs/lucid/types/model"
import { Pagination } from "../../types/pagination.js"

/**
 * Interface das entidades
 * @template Entity Propriedades da entidade
 * @template CreateEntity Propriedades necessárias para a criação da entidade
 * @template UpdateEntity Propriedades necessárias para a atualização da entidade
*/
export default interface IEntity<Entity extends LucidRow, CreateEntity, UpdateEntity> {
    Create: (createProps : CreateEntity, validate: boolean) => Promise<Entity>
    Update: (updateProps : UpdateEntity, validate: boolean) => Promise<Entity>
    ValidateCreation: (createProps : CreateEntity) => Promise<void>
    ValidateUpdate: (updateProps : UpdateEntity) => Promise<void>
    Get: (id : number) => Promise<Entity | null>
    Delete: (id : number) => Promise<void>
    List(pagination : Pagination) : Promise<ModelPaginatorContract<Entity>>
}