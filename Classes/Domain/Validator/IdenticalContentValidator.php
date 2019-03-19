<?php
namespace LTH\LthPowermail\Domain\Validator;

/**
* IdenticalContentValidator
*/
class IdenticalContentValidator
{
    /**
     * Check if two fields are identical
     *
     * @param string $value
     * @param string $validationConfiguration
     * @return bool
     */
    public function validate100($value, $validationConfiguration)
    {
        $otherValue = $_POST['tx_powermail_pi1']['field'][$validationConfiguration];

        //echo $value . $validationConfiguration . $answers;
        if ($value && $otherValue) {
            if(trim($value) === trim($otherValue)) {
                return TRUE;
            }
        }
        return FALSE;
    }
}