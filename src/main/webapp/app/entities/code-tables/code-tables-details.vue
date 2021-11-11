<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="codeTables">
        <h2 class="jh-entity-heading" data-cy="codeTablesDetailsHeading">
          <span v-text="$t('vueappApp.codeTables.detail.title')">CodeTables</span> {{ codeTables.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('vueappApp.codeTables.description')">Description</span>
          </dt>
          <dd>
            <span>{{ codeTables.description }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="codeTables.id"
          :to="{ name: 'CodeTablesEdit', params: { codeTablesId: codeTables.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./code-tables-details.component.ts"></script>
