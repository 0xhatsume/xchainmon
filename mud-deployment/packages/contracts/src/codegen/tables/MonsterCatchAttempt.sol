// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

/* Autogenerated file. Do not edit manually. */

// Import store internals
import { IStore } from "@latticexyz/store/src/IStore.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { Memory } from "@latticexyz/store/src/Memory.sol";
import { SliceLib } from "@latticexyz/store/src/Slice.sol";
import { EncodeArray } from "@latticexyz/store/src/tightcoder/EncodeArray.sol";
import { FieldLayout } from "@latticexyz/store/src/FieldLayout.sol";
import { Schema } from "@latticexyz/store/src/Schema.sol";
import { EncodedLengths, EncodedLengthsLib } from "@latticexyz/store/src/EncodedLengths.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";

// Import user types
import { MonsterCatchResult } from "../common.sol";

library MonsterCatchAttempt {
  // Hex below is the result of `WorldResourceIdLib.encode({ namespace: "app", name: "MonsterCatchAtte", typeId: RESOURCE_OFFCHAIN_TABLE });`
  ResourceId constant _tableId = ResourceId.wrap(0x6f7461707000000000000000000000004d6f6e73746572436174636841747465);

  FieldLayout constant _fieldLayout =
    FieldLayout.wrap(0x0001010001000000000000000000000000000000000000000000000000000000);

  // Hex-encoded key schema of (bytes32)
  Schema constant _keySchema = Schema.wrap(0x002001005f000000000000000000000000000000000000000000000000000000);
  // Hex-encoded value schema of (uint8)
  Schema constant _valueSchema = Schema.wrap(0x0001010000000000000000000000000000000000000000000000000000000000);

  /**
   * @notice Get the table's key field names.
   * @return keyNames An array of strings with the names of key fields.
   */
  function getKeyNames() internal pure returns (string[] memory keyNames) {
    keyNames = new string[](1);
    keyNames[0] = "encounter";
  }

  /**
   * @notice Get the table's value field names.
   * @return fieldNames An array of strings with the names of value fields.
   */
  function getFieldNames() internal pure returns (string[] memory fieldNames) {
    fieldNames = new string[](1);
    fieldNames[0] = "result";
  }

  /**
   * @notice Register the table with its config.
   */
  function register() internal {
    StoreSwitch.registerTable(_tableId, _fieldLayout, _keySchema, _valueSchema, getKeyNames(), getFieldNames());
  }

  /**
   * @notice Register the table with its config.
   */
  function _register() internal {
    StoreCore.registerTable(_tableId, _fieldLayout, _keySchema, _valueSchema, getKeyNames(), getFieldNames());
  }

  /**
   * @notice Set result.
   */
  function setResult(bytes32 encounter, MonsterCatchResult result) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = encounter;

    StoreSwitch.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked(uint8(result)), _fieldLayout);
  }

  /**
   * @notice Set result.
   */
  function _setResult(bytes32 encounter, MonsterCatchResult result) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = encounter;

    StoreCore.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked(uint8(result)), _fieldLayout);
  }

  /**
   * @notice Set the full data using individual values.
   */
  function set(bytes32 encounter, MonsterCatchResult result) internal {
    bytes memory _staticData = encodeStatic(result);

    EncodedLengths _encodedLengths;
    bytes memory _dynamicData;

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = encounter;

    StoreSwitch.setRecord(_tableId, _keyTuple, _staticData, _encodedLengths, _dynamicData);
  }

  /**
   * @notice Set the full data using individual values.
   */
  function _set(bytes32 encounter, MonsterCatchResult result) internal {
    bytes memory _staticData = encodeStatic(result);

    EncodedLengths _encodedLengths;
    bytes memory _dynamicData;

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = encounter;

    StoreCore.setRecord(_tableId, _keyTuple, _staticData, _encodedLengths, _dynamicData, _fieldLayout);
  }

  /**
   * @notice Decode the tightly packed blob of static data using this table's field layout.
   */
  function decodeStatic(bytes memory _blob) internal pure returns (MonsterCatchResult result) {
    result = MonsterCatchResult(uint8(Bytes.getBytes1(_blob, 0)));
  }

  /**
   * @notice Decode the tightly packed blobs using this table's field layout.
   * @param _staticData Tightly packed static fields.
   *
   *
   */
  function decode(
    bytes memory _staticData,
    EncodedLengths,
    bytes memory
  ) internal pure returns (MonsterCatchResult result) {
    (result) = decodeStatic(_staticData);
  }

  /**
   * @notice Delete all data for given keys.
   */
  function deleteRecord(bytes32 encounter) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = encounter;

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /**
   * @notice Delete all data for given keys.
   */
  function _deleteRecord(bytes32 encounter) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = encounter;

    StoreCore.deleteRecord(_tableId, _keyTuple, _fieldLayout);
  }

  /**
   * @notice Tightly pack static (fixed length) data using this table's schema.
   * @return The static data, encoded into a sequence of bytes.
   */
  function encodeStatic(MonsterCatchResult result) internal pure returns (bytes memory) {
    return abi.encodePacked(result);
  }

  /**
   * @notice Encode all of a record's fields.
   * @return The static (fixed length) data, encoded into a sequence of bytes.
   * @return The lengths of the dynamic fields (packed into a single bytes32 value).
   * @return The dynamic (variable length) data, encoded into a sequence of bytes.
   */
  function encode(MonsterCatchResult result) internal pure returns (bytes memory, EncodedLengths, bytes memory) {
    bytes memory _staticData = encodeStatic(result);

    EncodedLengths _encodedLengths;
    bytes memory _dynamicData;

    return (_staticData, _encodedLengths, _dynamicData);
  }

  /**
   * @notice Encode keys as a bytes32 array using this table's field layout.
   */
  function encodeKeyTuple(bytes32 encounter) internal pure returns (bytes32[] memory) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = encounter;

    return _keyTuple;
  }
}
