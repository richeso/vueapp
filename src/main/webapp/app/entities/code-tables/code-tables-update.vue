<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="vueappApp.codeTables.home.createOrEditLabel"
          data-cy="CodeTablesCreateUpdateHeading"
          v-text="$t('vueappApp.codeTables.home.createOrEditLabel')"
        >
          Create or edit a CodeTables
        </h2>
        <div>
          <div class="form-group" v-if="codeTables.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="codeTables.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('vueappApp.codeTables.description')" for="code-tables-description"
              >Description</label
            >
            <input
              type="text"
              class="form-control"
              name="description"
              id="code-tables-description"
              data-cy="description"
              :class="{ valid: !$v.codeTables.description.$invalid, invalid: $v.codeTables.description.$invalid }"
              v-model="$v.codeTables.description.$model"
              required
            />
            <div v-if="$v.codeTables.description.$anyDirty && $v.codeTables.description.$invalid">
              <small class="form-text text-danger" v-if="!$v.codeTables.description.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.codeTables.description.minLength"
                v-text="$t('entity.validation.minlength', { min: 5 })"
              >
                This field is required to be at least 5 characters.
              </small>
            </div>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.codeTables.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./code-tables-update.component.ts"></script>
