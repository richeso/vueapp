<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="vueappApp.codeValues.home.createOrEditLabel"
          data-cy="CodeValuesCreateUpdateHeading"
          v-text="$t('vueappApp.codeValues.home.createOrEditLabel')"
        >
          Create or edit a CodeValues
        </h2>
        <div>
          <div class="form-group" v-if="codeValues.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="codeValues.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('vueappApp.codeValues.key')" for="code-values-key">Key</label>
            <input
              type="text"
              class="form-control"
              name="key"
              id="code-values-key"
              data-cy="key"
              :class="{ valid: !$v.codeValues.key.$invalid, invalid: $v.codeValues.key.$invalid }"
              v-model="$v.codeValues.key.$model"
              required
            />
            <div v-if="$v.codeValues.key.$anyDirty && $v.codeValues.key.$invalid">
              <small class="form-text text-danger" v-if="!$v.codeValues.key.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.codeValues.key.minLength"
                v-text="$t('entity.validation.minlength', { min: 3 })"
              >
                This field is required to be at least 3 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('vueappApp.codeValues.value')" for="code-values-value">Value</label>
            <input
              type="text"
              class="form-control"
              name="value"
              id="code-values-value"
              data-cy="value"
              :class="{ valid: !$v.codeValues.value.$invalid, invalid: $v.codeValues.value.$invalid }"
              v-model="$v.codeValues.value.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('vueappApp.codeValues.codeTables')" for="code-values-codeTables"
              >Code Tables</label
            >
            <select class="form-control" id="code-values-codeTables" data-cy="codeTables" name="codeTables" v-model="codeValues.codeTables">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  codeValues.codeTables && codeTablesOption.id === codeValues.codeTables.id ? codeValues.codeTables : codeTablesOption
                "
                v-for="codeTablesOption in codeTables"
                :key="codeTablesOption.id"
              >
                {{ codeTablesOption.id }}
              </option>
            </select>
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
            :disabled="$v.codeValues.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./code-values-update.component.ts"></script>
