<template>
  <div class="strength-meter">
    <el-input v-if="showInput"
      type="password"
      placeholder="Password"
      size="large"
      @change="handleChange"
      :value="innerValueRef"
      v-bind="$attrs"
     >
    </el-input> 
    <div class="strength-meter-bar">
      <div class="strength-meter-bar--fill" :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, unref, watchEffect } from 'vue';
import { zxcvbn } from '@zxcvbn-ts/core';

defineOptions({ name: 'StrengthMeter' });

const innerValueRef = ref('');

const props = defineProps({
  value: true,
  showInput: true,
  disabled: Boolean,
});

const emit = defineEmits(['score-change', 'change']);

const getPasswordStrength = computed(() => {
  const { disabled } = props;
  if (disabled) return -1;
  const innerValue = unref(innerValueRef);
  const score = innerValue ? zxcvbn(unref(innerValueRef)).score : -1;
  emit('score-change', score);
  return score;
});

function handleChange(e) {
  emit('change', e.target.value);
  innerValueRef.value = e.target.value;
}

watchEffect(() => {
  innerValueRef.value = props.value || '';
});

watch(
  () => unref(innerValueRef),
  (val) => {
    emit('change', val);
  },
);
</script>
<style lang="scss" scoped>
  .strength-meter {
    &-bar {
      position: relative;
      height: 6px;
      margin: 10px auto 3px;
      border-radius: 6px;
      background-color: #C0C4CC;

      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
        z-index: 10;
        width: 20%;
        height: inherit;
        border-width: 0 5px;
        border-style: solid;
        border-color: #fff;
        background-color: transparent;
      }

      &::before {
        left: 20%;
      }

      &::after {
        right: 20%;
      }

      &--fill {
        position: absolute;
        width: 0;
        height: inherit;
        transition: width 0.5s ease-in-out, background 0.25s;
        border-radius: inherit;
        background-color: transparent;

        &[data-score='0'] {
          width: 20%;
          background-color: darken(#F56C6C, 10%);
        }

        &[data-score='1'] {
          width: 40%;
          background-color: #F56C6C;
        }

        &[data-score='2'] {
          width: 60%;
          background-color: #E6A23C;
        }

        &[data-score='3'] {
          width: 80%;
          background-color: lighten(#95d475, 1%);
        }

        &[data-score='4'] {
          width: 100%;
          background-color: #67C23A;
        }
      }
    }
  }
</style>