<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="codeValues">
        <h2 class="jh-entity-heading" data-cy="codeValuesDetailsHeading">
          <span v-text="$t('vueappApp.codeValues.detail.title')">CodeValues</span> {{ codeValues.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('vueappApp.codeValues.key')">Key</span>
          </dt>
          <dd>
            <span>{{ codeValues.key }}</span>
          </dd>
          <dt>
            <span v-text="$t('vueappApp.codeValues.value')">Value</span>
          </dt>
          <dd>
            <span>{{ codeValues.value }}</span>
          </dd>
          <dt>
            <span v-text="$t('vueappApp.codeValues.codeTables')">Code Tables</span>
          </dt>
          <dd>
            <div v-if="codeValues.codeTables">
              <router-link :to="{ name: 'CodeTablesView', params: { codeTablesId: codeValues.codeTables.id } }">{{
                codeValues.codeTables.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="codeValues.id"
          :to="{ name: 'CodeValuesEdit', params: { codeValuesId: codeValues.id } }"
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

<script lang="ts" src="./code-values-details.component.ts"></script>
