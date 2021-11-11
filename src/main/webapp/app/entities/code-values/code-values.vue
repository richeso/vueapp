<template>
  <div>
    <h2 id="page-heading" data-cy="CodeValuesHeading">
      <span v-text="$t('vueappApp.codeValues.home.title')" id="code-values-heading">Code Values</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('vueappApp.codeValues.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'CodeValuesCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-code-values"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('vueappApp.codeValues.home.createLabel')"> Create a new Code Values </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && codeValues && codeValues.length === 0">
      <span v-text="$t('vueappApp.codeValues.home.notFound')">No codeValues found</span>
    </div>
    <div class="table-responsive" v-if="codeValues && codeValues.length > 0">
      <table class="table table-striped" aria-describedby="codeValues">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('vueappApp.codeValues.key')">Key</span></th>
            <th scope="row"><span v-text="$t('vueappApp.codeValues.value')">Value</span></th>
            <th scope="row"><span v-text="$t('vueappApp.codeValues.codeTables')">Code Tables</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="codeValues in codeValues" :key="codeValues.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CodeValuesView', params: { codeValuesId: codeValues.id } }">{{ codeValues.id }}</router-link>
            </td>
            <td>{{ codeValues.key }}</td>
            <td>{{ codeValues.value }}</td>
            <td>
              <div v-if="codeValues.codeTables">
                <router-link :to="{ name: 'CodeTablesView', params: { codeTablesId: codeValues.codeTables.id } }">{{
                  codeValues.codeTables.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CodeValuesView', params: { codeValuesId: codeValues.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CodeValuesEdit', params: { codeValuesId: codeValues.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(codeValues)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="vueappApp.codeValues.delete.question" data-cy="codeValuesDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-codeValues-heading" v-text="$t('vueappApp.codeValues.delete.question', { id: removeId })">
          Are you sure you want to delete this Code Values?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-codeValues"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeCodeValues()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./code-values.component.ts"></script>
